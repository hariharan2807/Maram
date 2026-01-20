import tailwind from '@tailwind';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  CalenderIcon,
  CheckIcon,
  EditIcon1,
  LocationICon1,
  SubscriptionIcon,
  TickIcon,
  TickIcon1,
} from '../../assets/icons';
import {
  CalenderComponent,
  DateCustomized,
  PauseSubscription,
  WeekDaysSelector,
} from '../../screens/Component';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { QuantityActions, Topbar } from '@Component';
import assets_manifest from '@assets';
import {
  Customized_days,
  decrementAction,
  incrementAction,
  updateSubscription_start_date,
} from '@actions/userActions';

// JSON Data Structure

const SUBSCRIPTION_DATA = {
  product: {
    id: '100',
    name: 'Farm Fresh Natural Milk',
    image: assets_manifest?.milk1,

    total_amount: 1000,
  },
  variation: {
    product_price_id: 5,
    variation: '1',
    unit: 'Litre',
    price: 50,
    quantity: 1,
  },

  subscription: {
      plan: 'Daily',
      start_date: ['21/01/2026'],
      next_billing_date: '01/02/2025',
      start_days: ['sun', 'mon'],
      status: '0',
    },
  delivery: {
    address:
      '1st, Gandhi Ind Est, L.J.X Cross Road, Thooraipakkam, Chennai - 600112',
    slot: 'Morning (7-9 AM)',
    contact: '+91 9876543210',
  },
  stats: {
    current_month: {
      delivered: {
        subscription: 25,
        additional: 2,
      },
      remaining: {
        subscription: 5,
        additional: 0,
      },
      total_days: 30,
    },
    billing: {
      subscription_fee: 1000,
      additional_orders: 0,
      total: 1000,
    },
  },
  additional_orders: [],
  settings: {
    allowed_plans: ['Daily', 'Alternate Days', 'Customized'],
    pause_duration: 7,
    pause_count: 2,
  },
};
const PLANS_CONFIG = {
  Daily: {
    description: 'Delivery every day',
    frequency: 30,
    color: '#80C659',
  },
  'Alternate Days': {
    description: 'Delivery every other day',
    frequency: 15,
    color: '#4F46E5',
  },
  Customized: {
    description: 'Choose specific days',
    frequency: 'Custom',
    color: '#F59E0B',
  },
};

export default function Subscription() {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState(
    SUBSCRIPTION_DATA.subscription.plan,
  );
  const Data = useSelector((state: any) => state.user.customized_dayss);
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [changeQty, setChangeQty] = useState(false);
  const [pause, setPause] = useState(false);

  const [customDates, setCustomDates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(
    SUBSCRIPTION_DATA?.variation?.quantity,
  );
  const [calenderOpen, setCalenderOpen] = useState(false);

  const initiateDecrement = useCallback(() => {
    setQuantity(quantity - 1);
  }, [quantity]);
  const initiateIncrement = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);
  // console.log('quantityquantityquantity', quantity);
  const handlePlanChange = newPlan => {
    setSelectedPlan(newPlan);
    setIsPlanModalVisible(false);
  };
    console.log("DataDataDataDataDataDataDataDataDataDataDataDataDataDataDataDataDataDataDataData",Data,selectedCategory)

  console.log("selectedCategoryselectedCategory",selectedCategory,selectedDate,customDates)
  const renderPlanOption = plan => {
    const isCurrent = plan === SUBSCRIPTION_DATA.subscription.plan;
    const isSelected = plan === selectedCategory;

    return (
      <TouchableOpacity
        key={plan}
        onPress={() => {
          if (selectedCategory !== plan) {
            setSelectedDate(null);
            setCustomDates([]);
            dispatch(Customized_days([]));
          }
          setSelectedCategory(plan);
        }}
        disabled={isCurrent}
        activeOpacity={0.8}
        style={[
          tailwind('flex-1 mx-1 py-4 rounded-xl items-center justify-center'),
          {
            backgroundColor: isCurrent
              ? '#F3F4F6'
              : isSelected
              ? PLANS_CONFIG[plan]?.color || '#80C659'
              : '#F9FAFB',
            borderWidth: 1,
            borderColor: isCurrent
              ? '#E5E7EB'
              : isSelected
              ? PLANS_CONFIG[plan]?.color
              : '#F3F4F6',
          },
        ]}
      >
        <Text
          style={[
            tailwind('font-bold text-center'),
            {
              color: isCurrent ? '#9CA3AF' : isSelected ? 'white' : '#374151',
            },
          ]}
        >
          {plan}
        </Text>
        {isCurrent && (
          <Text style={tailwind('text-xs text-gray-500 mt-1')}>(Current)</Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={tailwind('flex-1 bg-gray-50')}>
      <Topbar title="Subscription Details" type={3} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('pb-8')}
      >
        <View style={tailwind('bg-white mx-4 mt-4 rounded-2xl  ')}>
          <View style={tailwind('p-6')}>
            <View style={tailwind('')}>
              <Image
                source={SUBSCRIPTION_DATA.product.image}
                style={[tailwind('rounded-xl'), { width: '100%', height: 200 }]}
                resizeMode="contain"
              />
              <View style={tailwind('items-center mt-5')}>
                <Text style={tailwind('text-xl font-bold text-gray-900')}>
                  {SUBSCRIPTION_DATA.product.name}
                </Text>
                <Text style={tailwind('text-lg text-gray-600 mt-1')}>
                  {SUBSCRIPTION_DATA.variation?.variation}{' '}
                  {SUBSCRIPTION_DATA.variation.unit} / day
                </Text>
              </View>
            </View>
            <View style={tailwind('mt-6 pt-6 border-t border-gray-100')}>
              <View style={tailwind('flex-row items-center mb-3')}>
                <SubscriptionIcon />
                <Text style={tailwind('ml-2 text-gray-600')}>
                  Subscribed from{' '}
                  <Text style={tailwind('font-bold text-gray-900')}>
                    {SUBSCRIPTION_DATA.subscription.start_date[0]}
                  </Text>
                </Text>
              </View>

              <View style={tailwind('flex-row items-center')}>
                <Text style={tailwind('text-gray-600')}>Your Plan : </Text>
                <Text style={tailwind('text-xl font-bold text-gray-900')}>
                  {SUBSCRIPTION_DATA.subscription.plan}
                </Text>
              </View>
            </View>
          </View>
          <View style={tailwind('flex-row px-4 py-3 border-t border-gray-100')}>
            <TouchableOpacity
              onPress={() => setIsPlanModalVisible(true)}
              style={[
                tailwind('flex-1 mx-2 py-3 rounded-lg items-center'),
                { backgroundColor: '#FEF3C7' },
              ]}
            >
              <Text style={tailwind('font-bold ')}>Change Plan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setChangeQty(true);
              }}
              style={[
                tailwind('flex-1 mx-2 py-3 rounded-lg items-center'),
                { backgroundColor: '#D1FAE5' },
              ]}
            >
              <Text style={tailwind('font-bold ')}>Change Qty</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCalenderOpen(true);
                setPause(true);
              }}
              style={[
                tailwind('flex-1 mx-2 py-3 rounded-lg items-center'),
                { backgroundColor: '#DBEAFE' },
              ]}
            >
              <Text style={tailwind('font-bold text-blue-700')}>Pause</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              tailwind('mx-4 my-4 py-3 rounded-lg items-center'),
              {
                backgroundColor: '#FEE2E2',
                borderWidth: 1,
                borderColor: '#FCA5A5',
              },
            ]}
          >
            <Text style={tailwind('font-bold text-red-600')}>Unsubscribe</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('bg-white mx-4 mt-6 rounded-2xl   p-6')}>
          <View style={tailwind('flex-row items-center mb-6')}>
            <CheckIcon />
            <Text style={tailwind('ml-3 text-xl font-bold text-gray-900')}>
              This Month's Details
            </Text>
          </View>
          <View style={tailwind('mb-6')}>
            <Text style={tailwind('font-bold text-gray-700 mb-3')}>
              Subscription Orders
            </Text>
            <View style={tailwind('flex-row')}>
              <View
                style={[
                  tailwind('flex-1 p-4 rounded-xl mr-2'),
                  { backgroundColor: '#F0FDF4' },
                ]}
              >
                <Text style={tailwind('text-gray-600 mb-1')}>Delivered</Text>
                <Text style={tailwind('text-2xl font-bold text-gray-900')}>
                  {SUBSCRIPTION_DATA.stats.current_month.delivered.subscription}
                  <Text style={tailwind('text-sm text-gray-500')}>
                    {' '}
                    {SUBSCRIPTION_DATA.variation.unit}
                  </Text>
                </Text>
              </View>
              <View
                style={[
                  tailwind('flex-1 p-4 rounded-xl ml-2'),
                  { backgroundColor: '#FFFBEB' },
                ]}
              >
                <Text style={tailwind('text-gray-600 mb-1')}>Remaining</Text>
                <Text style={tailwind('text-2xl font-bold text-gray-900')}>
                  {SUBSCRIPTION_DATA.stats.current_month.remaining.subscription}
                  <Text style={tailwind('text-sm text-gray-500')}>
                    {' '}
                    {SUBSCRIPTION_DATA.variation.unit}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={tailwind('bg-white mx-4 mt-2 rounded-2xl   ')}>
          <View style={tailwind('flex-row items-center justify-between mb-4')}>
            <View style={tailwind('flex-row items-center')}>
              <LocationICon1 />
              <Text style={tailwind('ml-3 text-xl font-bold text-gray-900')}>
                Delivery Address
              </Text>
            </View>
            <TouchableOpacity style={tailwind('p-2')}>
              <EditIcon1 />
            </TouchableOpacity>
          </View>

          <View
            style={[tailwind('p-4 rounded-xl'), { backgroundColor: '#F8FAFC' }]}
          >
            <Text style={tailwind('text-gray-800 leading-6')}>
              {SUBSCRIPTION_DATA.delivery.address}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isPlanModalVisible}
        animationInTiming={300}
        animationOutTiming={200}
        onBackdropPress={() => setIsPlanModalVisible(false)}
        backdropOpacity={0.5}
      >
        <View style={tailwind('bg-white rounded-2xl p-6')}>
          <Text style={tailwind('text-2xl font-bold text-gray-900 mb-2')}>
            Change Subscription Plan
          </Text>
          <Text style={tailwind('text-gray-600 mb-6')}>
            Select a new plan for your subscription
          </Text>

          <View style={tailwind('flex-row mb-6')}>
            {SUBSCRIPTION_DATA.settings.allowed_plans.map(renderPlanOption)}
          </View>

          {selectedCategory && selectedCategory !== 'Customized' && (
            <TouchableOpacity
              onPress={() => {
                setCalenderOpen(true);
              }}
              style={[
                tailwind(
                  'flex-row items-center justify-between p-4 rounded-xl mb-6',
                ),
                {
                  backgroundColor: '#F9FAFB',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                },
              ]}
            >
              <View>
                <Text style={tailwind('text-gray-600 mb-1')}>
                  {selectedCategory === 'Daily'
                    ? 'Start Date'
                    : 'First Delivery Date'}
                </Text>
                <Text style={tailwind('font-bold text-gray-900')}>
                  {selectedDate ? selectedDate[0] : 'Select a date'}
                </Text>
              </View>
              <CalenderIcon />
            </TouchableOpacity>
          )}

          {selectedCategory === 'Customized' && (
            <View style={tailwind('mb-6')}>
              <DateCustomized
                setSelectedDate={setSelectedDate}
                selectedCat={selectedCategory}
                setSelectedCat={setSelectedCategory}
                selectedDate={selectedDate}
                setCustomDates={setCustomDates}
                customDates={customDates}
                calenderOpen={calenderOpen}
                setCalenderOpen={setCalenderOpen}
                subscription_start_date={customDates}
                totalAmount={SUBSCRIPTION_DATA.variation.price}
                total={null}
                Data={Data}
                new={false}
              />
            </View>
          )}

          {selectedCategory &&
            selectedCategory !== 'Customized' &&
            calenderOpen && (
              <DateCustomized
                setSelectedDate={setSelectedDate}
                selectedCat={selectedCategory}
                setSelectedCat={setSelectedCategory}
                selectedDate={selectedDate}
                setCustomDates={setCustomDates}
                customDates={customDates}
                calenderOpen={calenderOpen}
                setCalenderOpen={setCalenderOpen}
                subscription_start_date={customDates}
                totalAmount={SUBSCRIPTION_DATA.variation?.price}
                total={null}
                Data={Data}
                new={false}
              />
            )}
          <View style={tailwind('flex-row justify-end   ')}>
            <TouchableOpacity
              onPress={() => setIsPlanModalVisible(false)}
              style={tailwind('px-6 py-3')}
            >
              <Text style={tailwind('text-gray-600 font-bold')}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePlanChange(selectedCategory)}
              disabled={
                !selectedCategory ||
                (selectedCategory !== 'Customized' && !selectedDate) ||
                (selectedCategory === 'Customized' &&
                  !(customDates.length > 0 || (Data && Data.length > 0)))
              }
              style={[
                tailwind('px-6 py-3 rounded-lg'),
                {
                  backgroundColor:
                    selectedCategory &&
                    ((selectedCategory !== 'Customized' && selectedDate) ||
                      (selectedCategory === 'Customized' &&
                        (customDates.length > 0 || (Data && Data.length > 0))))
                      ? '#10B981'
                      : '#E5E7EB',
                },
              ]}
            >
              <Text style={tailwind('font-bold text-white')}>
                Confirm Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {isCalendarVisible && (
        <Modal
          isVisible={isCalendarVisible}
          animationInTiming={300}
          animationOutTiming={200}
          onBackdropPress={() => {
            setIsCalendarVisible(false);
            setIsPlanModalVisible(true);
          }}
          backdropOpacity={0.5}
        >
          <View style={tailwind('bg-white rounded-2xl p-6')}>
            <Text style={tailwind('text-2xl font-bold text-gray-900 mb-4')}>
              {selectedCategory === 'Daily'
                ? 'Select Start Date'
                : selectedCategory === 'Alternate Days'
                ? 'Select First Delivery Date'
                : 'Select Dates'}
            </Text>

            <DateCustomized
              setSelectedDate={setSelectedDate}
              selectedCat={selectedCategory}
              setSelectedCat={setSelectedCategory}
              selectedDate={selectedDate}
              setCustomDates={setCustomDates}
              customDates={customDates}
              calenderOpen={isCalendarVisible}
              setCalenderOpen={setIsCalendarVisible}
              subscription_start_date={customDates}
              totalAmount={SUBSCRIPTION_DATA.variation.price}
              total={null}
              Data={Data}
              new={false}
            />

            <View style={tailwind('flex-row justify-end    mt-4')}>
              <TouchableOpacity
                onPress={() => {
                  setIsCalendarVisible(false);
                  setIsPlanModalVisible(true);
                }}
                style={tailwind('px-6 py-3')}
              >
                <Text style={tailwind('text-gray-600 font-bold')}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Modal
        isVisible={changeQty}
        animationInTiming={300}
        animationOutTiming={200}
        onBackdropPress={() => {
          setChangeQty(false);
        }}
        backdropOpacity={0.5}
      >
        <View style={tailwind('bg-white rounded-2xl py-3 items-center')}>
          <Text style={[tailwind('font-bold font-22 py-5')]}>
            Edit Quantity
          </Text>
          {/* <View style={[tailwind('')]}> */}
          <Image
            source={SUBSCRIPTION_DATA.product.image}
            style={[tailwind('rounded-xl'), { width: '100%', height: 150 }]}
            resizeMode="contain"
          />
          <View style={tailwind('items-center mt-5')}>
            <Text style={tailwind('text-xl font-bold text-gray-900')}>
              {SUBSCRIPTION_DATA.product.name}
            </Text>
            <Text style={tailwind('text-lg text-gray-600 mt-1')}>
              ₹ {SUBSCRIPTION_DATA.variation.price}
              {' | '} {SUBSCRIPTION_DATA.variation.variation}{' '}
              {SUBSCRIPTION_DATA.variation.unit}
            </Text>
            {/* </View> */}
          </View>
          <View
            style={[
              tailwind('flex-row  items-center py-3 '),
              { borderRadius: 10, width: '50%' },
            ]}
          >
            <TouchableOpacity
              onPress={initiateDecrement}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={[
                {
                  backgroundColor: '#80C659',
                  width: '30%',
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10,
                },
                tailwind(''),
              ]}
            >
              <Text style={tailwind('font-bold font-20 text-white')}>−</Text>
            </TouchableOpacity>
            <View
              style={[
                tailwind('flex-row items-center'),
                { justifyContent: 'center', width: '30%' },
              ]}
            >
              <Text
                style={tailwind('font-bold text-base text-black text-center')}
              >
                {quantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={initiateIncrement}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={[
                {
                  width: '30%',
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#80C659',
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                },
                tailwind(''),
              ]}
            >
              <Text
                style={[tailwind('font-bold font-20 '), { color: 'white' }]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[tailwind('font-15 font-bold')]}>
            Your Quantity changed into {quantity}{' '}
            {SUBSCRIPTION_DATA.variation.unit}
          </Text>
          <TouchableOpacity
            style={[
              tailwind('py-3 px-3 bg-green my-3 items-center rounded-full'),
              { width: '90%' },
            ]}
          >
            <Text style={[tailwind('font-bold text-white font-20')]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={pause}
        animationInTiming={300}
        animationOutTiming={200}
        onBackdropPress={() => {
          setPause(false);
        }}
        backdropOpacity={0.5}
      >
        <View style={tailwind('bg-white rounded-2xl py-3  px-3')}>
          <Text style={[tailwind('font-bold font-18 py-3')]}>
            Pause Subscription
          </Text>
          <Text style={[tailwind('font-15 py-2')]}>Your Plan</Text>
          <View style={[tailwind('flex-row items-center')]}>
            <TickIcon1 />
            <Text style={[tailwind('text-green ml-2 font-bold font-16')]}>
              {SUBSCRIPTION_DATA?.subscription?.plan}
            </Text>
          </View>
          <Text style={[tailwind('font-15 my-3')]}>Select Date</Text>

          {/* <DateCustomized
            setSelectedDate={setSelectedDate}
            selectedCat={selectedCategory}
            setSelectedCat={setSelectedCategory}
            selectedDate={selectedDate}
            setCustomDates={setCustomDates}
            customDates={customDates}
            calenderOpen={isCalendarVisible}
            setCalenderOpen={setIsCalendarVisible}
            subscription_start_date={customDates}
            totalAmount={SUBSCRIPTION_DATA.variation.price}
            total={null}
            Data={Data}
            new={true}
          /> */}
          {
            <PauseSubscription
              setSelectedDate={setSelectedDate}
              selectedCat={selectedCategory}
              setSelectedCat={setSelectedCategory}
              selectedDate={selectedDate}
              setCustomDates={setCustomDates}
              customDates={customDates}
              calenderOpen={calenderOpen}
              setCalenderOpen={setCalenderOpen}
              setPause={setPause}
              SUBSCRIPTION_DATA={SUBSCRIPTION_DATA}
            />
          }

         
        </View>
      </Modal>
    </View>
  );
}
