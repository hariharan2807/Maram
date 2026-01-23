import tailwind from '@tailwind';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChangeAddress, Topbar } from '@Component';
import { useDispatch, useSelector } from 'react-redux';
import CartComponent from '../../Component/CartComponent';
import {
  Customized_days,
  decrementAction,
  incrementAction,
  updateCart,
  updateCategory_List,
  updateSubscription_start_date,
} from '@actions/userActions';
import {
  CalenderIcon,
  CalenderIcon1,
  TickIcon,
  LocationICon1,
  EditIcon1,
} from '../../assets/icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  CalenderComponent,
  DateCustomized,
  WeekDaysSelector,
} from '../../screens/Component';
import { errorBox, infoBox } from '../../workers/utils';
import assets_manifest from '@assets';
import { Modalize } from 'react-native-modalize';

export default function NewSubscription() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addressSheetRef = useRef(null);
  const { width } = useWindowDimensions();
  const CartState = useSelector((state: any) => state.user.cart);
  const subscription_start_date = useSelector(
    (state: any) => state.user.subscription_start_date,
  );
  const Address = useSelector((state: any) => state.user.userAddresses);
  const Data = useSelector((state: any) => state.user.customized_dayss);

  // console.log('AddressAddressAddressAddress', Address);

  const category_list = useSelector((state: any) => state.user.category_list);

  //   console.log('CartStateCartStateCartStateCartState', CartState);

  const List = [
    { name: 'Daily' },
    { name: 'Alternate Days' },
    { name: 'Customized' },
  ];
  const WEEK_DAYS = [
    { label: 'Sun', value: 0 },
    { label: 'Mon', value: 1 },
    { label: 'Tue', value: 2 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 4 },
    { label: 'Fri', value: 5 },
    { label: 'Sat', value: 6 },
  ];
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [customDates, setCustomDates] = useState([]);
  const [value, setValue] = useState(false);
  const [selectedCat, setSelectedCat] = useState(List[0].name);
  const prevCategoryRef = React.useRef(selectedCat);
  useFocusEffect(
    useCallback(() => {
      if (Address) {
        setSelectedAddress(Address);
      }

      // Optional cleanup function
      return () => {
        // Cleanup code here (if needed)
      };
    }, [Address]), // Add dependencies here
  );
  //   const formatDate = (date) => {
  //   return date.toISOString().split('T')[0];
  // };

  // const today = formatDate(new Date());
  useEffect(() => {
    dispatch(Customized_days([]));
  }, []);
  const scaleFont = (size: number) => (width / 375) * size;

  const formatToDayMonth = (dateStr: string) => {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });

    const getSuffix = d => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${getSuffix(day)} ${month}`;
  };
  // useEffect(() => {
  //   console.log('Redux selected days:', Data);
  // }, [Data]);
  useEffect(() => {
    // category really changed
    if (prevCategoryRef.current !== selectedCat) {
      setCustomDates([]);
      dispatch(updateSubscription_start_date([]));
      dispatch(Customized_days([]));
      setSelectedDate(null);
    }
    // if (selectedCat === 'Customized') {
    //   setCalenderOpen(true);
    // }
    prevCategoryRef.current = selectedCat;
  }, [selectedCat]);
  useEffect(() => {
    if (CartState?.length == 0) {
      navigation?.goBack();
    }
  }, [CartState]);
  const increment = useCallback((payload: any) => {
    dispatch(incrementAction(payload));
  }, []);
  const decrement = useCallback((uuid: any) => {
    dispatch(decrementAction(uuid));
  }, []);
  const totalAmount = CartState.reduce(
    (sum, item) => sum + item.quantity * item.product_price,
    0,
  );
  const WEEK_LABELS = WEEK_DAYS.reduce((acc, day) => {
    acc[day.label] = day.value;
    return acc;
  }, {});
  // const getFutureDatesByWeekday = selectedDays => {
  //   const today = new Date();
  //   const currentYear = today.getFullYear();
  //   const currentMonth = today.getMonth();
  //   const result = {};

  //   // Convert labels to numbers
  //   const selectedWeekdayNumbers = selectedDays.map(day => WEEK_LABELS[day]);

  //   // Initialize result object
  //   selectedDays.forEach(day => (result[day] = []));

  //   // Calculate for current month AND next month
  //   for (let monthOffset = 0; monthOffset < 1; monthOffset++) {
  //     const targetMonth = currentMonth + monthOffset;
  //     const targetYear =
  //       monthOffset === 0
  //         ? currentYear
  //         : currentMonth === 11
  //         ? currentYear + 1
  //         : currentYear;
  //     const actualMonth = targetMonth % 12;
  //     const actualYear = targetYear + Math.floor(targetMonth / 12);

  //     // Total days in target month
  //     const daysInMonth = new Date(actualYear, actualMonth + 1, 0).getDate();

  //     for (let day = 1; day <= daysInMonth; day++) {
  //       const date = new Date(actualYear, actualMonth, day);
  //       const weekday = date.getDay();

  //       // Only future dates including today (for current month only)
  //       // For next month, include all dates
  //       if ((monthOffset === 0 && date >= today) || monthOffset === 1) {
  //         if (selectedWeekdayNumbers.includes(weekday)) {
  //           const label = Object.keys(WEEK_LABELS).find(
  //             key => WEEK_LABELS[key] === weekday,
  //           );
  //           result[label].push({
  //             date: date.toISOString().split('T')[0], // YYYY-MM-DD
  //             day: day,
  //             month: actualMonth + 1,
  //             year: actualYear,
  //             fullDate: `${day}/${actualMonth + 1}/${actualYear}`,
  //           });
  //         }
  //       }
  //     }
  //   }

  //   return result;
  // };
  // const futureDates = getFutureDatesByWeekday(Data);
  // // console.log('futureDatesfutureDatesfutureDatesfutureDates', futureDates);
  // const counts = {};
  // for (const day in futureDates) {
  //   counts[day] = futureDates[day].length;
  // }
  // const total = Object.values(counts).reduce((sum, val) => sum + val, 0);

  const getTotalDatesFromStartToEnd = (selectedDays, startDate) => {
    if (
      !Array.isArray(selectedDays) ||
      selectedDays.length === 0 ||
      !startDate
    ) {
      return 0;
    }
    console.log('selectedDaysselectedDays', selectedDays, startDate);
    const WEEK_LABELS = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    // Convert start date to Date object
    const startDateObj = new Date(startDate);
    const today = new Date();

    // Use today if startDate is before today
    const actualStartDate = startDateObj >= today ? startDateObj : today;

    // Get end of next month
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1, 0); // Last day of next month

    // Convert selected days to numbers
    const selectedDayNumbers = selectedDays.map(day => WEEK_LABELS[day]);

    let totalCount = 0;
    const allDates = [];

    // Loop from start date to end date
    const currentDate = new Date(actualStartDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();

      // Check if this day is in selected days
      if (selectedDayNumbers.includes(dayOfWeek)) {
        totalCount++;
        allDates.push({
          date: currentDate.toISOString().split('T')[0],
          dayName: Object.keys(WEEK_LABELS).find(
            key => WEEK_LABELS[key] === dayOfWeek,
          ),
        });
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      total: totalCount,
      dates: allDates,
      startDate: actualStartDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };

  // Usage with your data
  const selectedDays = Data; // e.g., ['Wed', 'Tue', 'Mon', 'Fri']
  const startDate = selectedDate?.[0]; // e.g., '2026-01-27'
  // console.log("startDatestartDatestartDatestartDate",startDate)
  // Get total count from start date to end of next month
  const result = getTotalDatesFromStartToEnd(selectedDays, startDate);

  // console.log('Start Date:', result.startDate);
  // console.log('End Date:', result.endDate);
  // console.log('Total dates from start to end:', result.total);
  // console.log('All dates:', result.dates);

  // If you just need the total number
  const totalDatesCount = result.total;
  // console.log('Total count:', totalDatesCount);
  const Subscription = () => {
    console.log('objjjjjj', CartState);
    console.log(
      'log data LIst ',
      'selected Category--->',
      selectedCat,
      'selected Date---->',
      selectedDate,
      'Customized---->',
      Data,
    );
    const obj = {
      image: CartState?.[0]?.image,
      product_id: CartState?.[0]?.product_id,
      product_name: CartState?.[0]?.product_name,
      product_price: CartState?.[0]?.product_price,
      product_price_id: CartState?.[0]?.product_price_id,
      quantity: CartState?.[0]?.quantity,
      variation: CartState?.[0]?.variation,
      address: Address?.[0],
      category: selectedCat,
      start_date: [selectedDate?.[0]],
      total_amount:
        totalAmount * (subscription_start_date?.length || totalDatesCount),
      start_days: Data,
    };
    console.log('objobj', obj);
    if (!subscription_start_date?.length && !totalDatesCount) {
      return errorBox('Please Choose Your Start Date');
    } else {
      dispatch(updateCategory_List(null));
      dispatch(updateSubscription_start_date([]));
      dispatch(Customized_days([]));
      dispatch(updateCart([]));

      infoBox('Success');
      navigation?.navigate('SubscritionSuccess');
    }
  };
  // console.log(
  //   'Counts per weekdaytotalselectedDate:',
  //   selectedDate,
  //   Data,
  //   selectedCat,
  // );
  const ChangeAddressDetails = data => {
    setSelectedAddress(data);
    addressSheetRef?.current?.close();
  };
  return (
    <View style={[tailwind('flex-1 bg-gray-50')]}>
      <Topbar title="New Subscription" type={3} />
      <ImageBackground
        style={[tailwind('flex-1'), { height: '100%', width: '100%' }]}
        source={assets_manifest?.background}
      >
        <ScrollView
          style={tailwind('flex-1')}
          showsVerticalScrollIndicator={false}
        >
          {CartState?.map((item: any, index: number) => (
            <View
              key={index}
              style={[
                tailwind('mx-4 my-3 rounded-xl p-4'),
                {
                  backgroundColor: '#ffffff',
                  borderWidth: 1,
                  borderColor: '#F0F0F0',
                },
              ]}
            >
              <CartComponent
                isVeg={item.eggless == 0 || item.eggless == 1}
                veg={item.eggless == 0}
                quantity={item?.quantity}
                image={item.image}
                product_name={item?.product_name}
                id={item?.product_id}
                offer={item?.offer}
                is_favourite={item?.is_favourite}
                description={item?.description}
                product_image={item?.product_image}
                variation={item?.variation}
                increment={increment}
                decrement={decrement}
                color_variation={item.product_color_var}
                item={item}
                product_price={item?.product_price}
                type={1}
              />
            </View>
          ))}
          <View style={tailwind('mx-4 mt-6')}>
            <View style={tailwind('flex-row items-center mb-4')}>
              <CalenderIcon1 />
              <Text style={tailwind('font-bold ml-2 text-gray-900 text-lg')}>
                Schedule Delivery
              </Text>
            </View>
            <Text style={tailwind('font-bold text-gray-500 text-lg mb-3')}>
              Choose Your Plan
            </Text>

            {List?.length > 0 && (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {List.map((items: any, index: any) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tailwind(
                        'px-3 mx-1 py-3 flex-row items-center  rounded-full',
                      ),
                      {
                        backgroundColor:
                          selectedCat === items?.name ? '#80C659' : '#F3F4F6',
                      },
                    ]}
                    onPress={() => {
                      dispatch(updateCategory_List(items?.name));
                      setSelectedCat(items?.name);
                    }}
                  >
                    {selectedCat === items?.name && <TickIcon />}
                    <Text
                      style={[
                        tailwind(
                          `font-bold  font-15 ${
                            selectedCat === items?.name ? 'ml-2' : ''
                          }`,
                        ),
                        {
                          color:
                            selectedCat === items?.name ? 'white' : '#374151',
                        },
                      ]}
                    >
                      {items?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <View style={[tailwind('mt-3')]}>
              {subscription_start_date?.length > 0 ? (
                <View
                  style={[
                    tailwind('border items-center rounded-full px-4 py-1 my-2'),
                    {
                      backgroundColor: '#ebffe0',
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      borderColor: '#80C659',
                    },
                  ]}
                >
                  <View
                    style={tailwind(
                      'flex-row items-center justify-between w-full',
                    )}
                  >
                    <View style={tailwind('flex-row items-center flex-1 ')}>
                      <Text
                        style={tailwind(
                          'text-center py-3 text-gray-700 font-14',
                        )}
                      >
                        Your delivery will start from {''}
                        {formatToDayMonth(subscription_start_date?.[0])}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={tailwind('p-2')}
                      onPress={() => {
                        dispatch(updateSubscription_start_date([]));
                        /* Add your close logic here */
                      }}
                    >
                      <Text style={tailwind('text-red font-bold text-lg')}>
                        ×
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : selectedCat !== 'Customized' ? (
                <View
                  style={[
                    tailwind('flex-row px-3 py-3 rounded-xl'),
                    { backgroundColor: '#F3F4F6' },
                  ]}
                >
                  <Text style={[tailwind('font-18'), { width: '70%' }]}>
                    Pick the start date for your subscriptions
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setCalenderOpen(true);
                    }}
                    style={[tailwind(''), { marginLeft: 'auto' }]}
                  >
                    <CalenderIcon />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <DateCustomized
              setSelectedDate={setSelectedDate}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              selectedDate={selectedDate}
              setCustomDates={setCustomDates}
              customDates={customDates}
              calenderOpen={calenderOpen}
              setCalenderOpen={setCalenderOpen}
              subscription_start_date={subscription_start_date}
              totalAmount={totalAmount}
              total={totalDatesCount}
              new={true}
              Data={Data}
              save={true}
            />

            {/* {calenderOpen && selectedCat !== 'Customized' && (
            <CalenderComponent
              setSelectedDate={setSelectedDate}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              selectedDate={selectedDate}
              setCustomDates={setCustomDates}
              customDates={customDates}
              calenderOpen={calenderOpen}
              setCalenderOpen={setCalenderOpen}
            />
          )} */}
            {/* {selectedCat === 'Customized' && <WeekDaysSelector />} */}
            {/* {!!(subscription_start_date?.length || total) && (
            <View
              style={[
                tailwind('flex-row px-3 my-3 py-3 rounded-xl items-center'),
                { backgroundColor: '#F3F4F6' },
              ]}
            >
              <Text
                style={[
                  tailwind('font-17'),
                  { width: '40%', textTransform: 'capitalize' },
                ]}
              >
                this month estimated cost
              </Text>
              <Text style={[tailwind('text-gray-500'), { marginLeft: 'auto' }]}>
                {totalAmount} x
                {subscription_start_date?.length
                  ? subscription_start_date?.length
                  : total}
                Days
              </Text>
              <Text style={[tailwind('font-bold')]}>
                | ₹{totalAmount * (subscription_start_date?.length || total)}
              </Text>
            </View>
          )} */}
          </View>
          {Address?.length > 0 ? (
            <View
              style={[tailwind('mx-5 my-3 white-shadow px-3 py-3 rounded-xl')]}
            >
              <View style={[tailwind('flex-row items-center')]}>
                <LocationICon1 />
                <Text style={[tailwind('ml-2 font-bold font-18 text-black')]}>
                  Delivery Address
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    addressSheetRef?.current?.open();
                  }}
                  style={[tailwind(''), { marginLeft: 'auto' }]}
                >
                  <EditIcon1 />
                </TouchableOpacity>
              </View>
              <View
                style={[tailwind('rounded-xl px-3 my-3 py-3 white-shadow')]}
              >
                <Text style={[tailwind('font-bold text-black py-3')]}>
                  {Address?.[0]?.user_address_details}
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('AddAddressScreen');
              }}
              style={[
                tailwind('border mx-3 px-3 py-3 mt-5 rounded-full'),
                { borderColor: '#80C659' },
              ]}
            >
              <Text
                style={[tailwind('text-center font-bold font-15 text-green')]}
              >
                + Add Delivery Address
              </Text>
            </TouchableOpacity>
          )}

          <View style={tailwind('h-20')} />
        </ScrollView>
      </ImageBackground>
      <View
        style={[
          tailwind('px-4 py-4 border-t'),
          {
            backgroundColor: 'white',
            borderTopColor: '#E5E7EB',
          },
        ]}
      >
        <Text style={[tailwind('text-center mb-2 font-15 text-gray-500')]}>
          Once you subscribe, the item will be start delivering on the date you
          select.
        </Text>
        <TouchableOpacity
          onPress={() => {
            Subscription();
          }}
          style={[
            tailwind('rounded-full py-3 items-center'),
            { backgroundColor: '#80C659' },
          ]}
          activeOpacity={0.8}
        >
          <Text style={tailwind('text-white text-lg font-bold')}>
            Subscribe
          </Text>
        </TouchableOpacity>
      </View>
      <Modalize
        ref={addressSheetRef}
        modalTopOffset={200}
        adjustToContentHeight={true}
        HeaderComponent={
          <View
            style={tailwind(
              'flex-row justify-between items-center p-5 border-b border-gray-100',
            )}
          >
            <Text
              style={[
                tailwind('font-bold text-gray-800'),
                { fontSize: scaleFont(18) },
              ]}
            >
              Select Address
            </Text>
            <TouchableOpacity
              style={[
                tailwind('rounded-full px-4 py-2'),
                { backgroundColor: '#80C659' },
              ]}
              onPress={() => navigation?.navigate('AddAddressScreen')}
            >
              <Text
                style={[
                  tailwind('font-semi text-white'),
                  { fontSize: scaleFont(14) },
                ]}
              >
                + Add New
              </Text>
            </TouchableOpacity>
          </View>
        }
        disableScrollIfPossible={false}
        closeOnOverlayTap={true}
      >
        {Address?.length &&
          selectedAddress &&
          Address?.map((item, index) => (
            <ChangeAddress
              key={`${item?.user_address_id}_${index}`}
              selectedAddress={selectedAddress}
              address_id={item?.user_address_id}
              user_address_name={item?.user_address_name}
              user_address_details={item?.user_address_details}
              action={ChangeAddressDetails}
              item={item}
              setValue={setValue}
            />
          ))}
      </Modalize>
    </View>
  );
}
