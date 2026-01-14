import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import tailwind from '@tailwind';
import { CheckOutButton, FullScreenLoading, Topbar } from '@Component';
import { useQuery } from 'react-query';
import { get_category_product, getCategory } from '@remote/userRemote';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductCart } from '../../Component/ProductCart';
import { decrementAction, incrementAction } from '@actions/userActions';
import { isBranchOpen } from '../../workers/utils';

export default function CategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const itemRefs = useRef({});
  const ID = useSelector((state: any) => state.user.user_id);
  const CartState = useSelector((state: any) => state.user.cart);
  const Branch = useSelector((state: any) => state.app.branch);

  //   console.log('CartStateCartStateCartState', CartState);
  const totalQuantity = CartState.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );
  const [selected_id, setSelected_id] = useState(route?.params?.id || null);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const Category = useQuery(['getCategory', ID ? ID : ''], getCategory);

  const ProductData = useQuery(
    ['get_category_product', selected_id, ID, page],
    () =>
      get_category_product({
        cat_id: selected_id,
        user_id: ID ? ID : '',
        page: page, // Add page parameter
      }),
    {
      enabled: !!selected_id,
      onSuccess: data => {
        if (page === 0) {
          // First page - replace products
          setProducts(data?.GTS || []);
        } else {
          // Next pages - append products
          setProducts(prev => [...prev, ...(data?.GTS || [])]);
        }

        // Check if there are more products
        if (!data?.GTS || data?.GTS?.length === 0) {
          setHasMore(false);
        }

        setIsLoadingMore(false);
      },
      onError: () => {
        // If API fails, don't update page
        setIsLoadingMore(false);
      },
    },
  );
  console.log("ProductDataProductData",ProductData)
  useEffect(() => {
    setPage(0);
    setProducts([]);
    setHasMore(true);
  }, [selected_id]);
  useEffect(() => {
    if (selected_id && itemRefs.current[selected_id]) {
      itemRefs.current[selected_id].measureLayout(
        scrollViewRef.current,
        (x, y, width, height) => {
          scrollViewRef.current?.scrollTo({
            x: x - 20,
            y: 0,
            animated: true,
          });
        },
        () => {},
      );
    }
  }, [selected_id]);

  const increment = useCallback((payload: any) => {
    dispatch(incrementAction(payload));
  }, []);

  const decrement = useCallback((payload: any) => {
    dispatch(decrementAction(payload));
  }, []);
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore && !ProductData?.isLoading) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
    }
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const isOpen = isBranchOpen(Branch);

  if (Category?.isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <View style={[tailwind('flex-1 bg-secondary')]}>
      <Topbar title="Menu" type={5} />

      {/* Category Horizontal Scroll - Fixed Height */}
      <View style={[tailwind('bg-secondary'), { height: 60 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tailwind('px-3')}
          contentContainerStyle={tailwind('py-2')}
          ref={scrollViewRef}
        >
          {Category?.data?.GTS?.map(category => {
            const isSelected = category?.category_id === selected_id;
            return (
              <TouchableOpacity
                key={category.category_id}
                style={[
                  tailwind('px-5 py-2 mr-3 '),
                  {
                    borderBottomWidth: isSelected ? 3 : 0,
                    borderBottomColor: isSelected ? '#000' : 'transparent',
                  },
                ]}
                activeOpacity={0.7}
                ref={ref => (itemRefs.current[category.category_id] = ref)}
                onPress={() => setSelected_id(category?.category_id)}
              >
                <Text style={[tailwind('font-bold'), { color: '#000' }]}>
                  {category?.category_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products Vertical Scroll - Flexible Height */}
      <View style={[tailwind('flex-1')]}>
        {ProductData?.isLoading && page === 0 ? (
          // First page loading
          <View style={tailwind('flex-1 items-center justify-center')}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={tailwind('mt-3 text-gray-600')}>
              Loading products...
            </Text>
          </View>
        ) : products?.length > 0 ? (
          // Show products from local state
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                handleLoadMore();
              }
            }}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tailwind('pb-5')}
          >
            {products?.map((items: any, index: any) => (
              <ProductCart
                type={1}
                desigin_type={1}

                id={items?.product_id}
                img={items?.product_image}
                name={items?.product_name}
                key={`${items?.product_id}-${index}`}
                increment={increment}
                decrement={decrement}
                product_price={items?.product_price}
                is_favourite={items?.is_favourite}
                product_type={items?.product_type === '0'}
                refreshData={ProductData}
                isOpen={isOpen}
                product_percentage={items?.product_percentage}
                product_offer={items?.product_offer}

              />
            ))}

            {/* Loading More Indicator */}
            {isLoadingMore && hasMore && (
              <View style={tailwind('py-4 items-center')}>
                <ActivityIndicator size="small" color="#000" />
                <Text style={tailwind('mt-2 text-gray-500')}>
                  Loading more...
                </Text>
              </View>
            )}

            {/* No More Products */}
            {/* {!hasMore && products?.length > 0 && (
          <View style={tailwind('py-4 items-center')}>
            <Text style={tailwind('text-gray-500')}>
              No more products
            </Text>
          </View>
        )} */}
          </ScrollView>
        ) : (
          // Only show empty state when first page load and no products
          <View style={tailwind('flex-1 items-center justify-center')}>
            <Text style={tailwind('text-gray-500 text-lg')}>
              No products available
            </Text>
          </View>
        )}
      </View>
      {CartState.length > 0 && (
        <CheckOutButton
          CartState={CartState}
          totalQuantity={totalQuantity}
          navigation={navigation}
        />
      )}
    </View>
  );
}
