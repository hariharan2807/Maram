import { Topbar } from '@Component';
import tailwind from '@tailwind';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import assets_manifest from '@assets';
import { CalenderIconSubscription } from '../../assets/icons';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const ProductData = [
    {
      category_name: 'Farm Fresh Natural Milk',
      product_id: '84',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      order_type: 'Daily',
      product_price: {
        product_price_id: '729',
        product_variation: '0.5 ',
        product_unit: 'Litre',
        product_price: 25,
        mrp_price: 30.5,
      },
      product_type: '1',
      timeslot: '0',
      subscribe: 1,
    },
    {
      category_name: 'Farm Fresh Natural Milk',
      eggless: '0',
      is_favourite: 0,
      product_id: '84',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      product_offer: '0',
      product_percentage: '0',
      order_type: 'Alternative',

      product_price: {
        product_price_id: '729',
        product_variation: '0.5 ',
        product_unit: 'Litre',
        product_price: 25,
        mrp_price: 10,
      },
      product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 0,
    },
    {
      category_name: 'Farm Fresh Natural Milk',
      eggless: '0',
      is_favourite: 0,
      product_id: '84',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      product_offer: '0',
      order_type: 'Customized',

      product_percentage: '0',
      product_price: {
        product_price_id: '729',
        product_variation: '500 ',
        product_unit: 'ml',
        product_price: 45,
        mrp_price: 60.5,
      },
      product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 0,
    },
  ];
  const formatDate = date => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };
  const getToday = () => {
    return formatDate(new Date());
  };
  const getCurrentMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return {
      start: formatDate(start),
      end: formatDate(end),
      monthName: now.toLocaleString('default', { month: 'long' }),
      year: now.getFullYear(),
      fullMonth: `${now.toLocaleString('default', {
        month: 'long',
      })} ${now.getFullYear()}`,
    };
  };
  useEffect(() => {
    const today = getToday();
    setSelectedDate(today);
    const initialMarkedDates = {
      [today]: {
        selected: true,
        selectedColor: '#80C659',
        selectedTextColor: '#FFFFFF',
      },
    };
    setMarkedDates(initialMarkedDates);
  }, []);
  useEffect(() => {
    const Data = async () => {};
    Data();
  }, [selectedDate]);
  const onDayPress = day => {
    const dateString = day.dateString;
    // console.log('dateStringdateStringdateStringdateString', dateString);
    setSelectedDate(dateString);
    const newMarkedDates = {
      [dateString]: {
        selected: true,
        selectedColor: '#80C659',
        selectedTextColor: '#FFFFFF',
      },
    };
    setMarkedDates(newMarkedDates);
  };

  return (
    <View style={styles.container}>
      <Topbar title="Calendar" type={3} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.calendarHeader}></View>
        <View style={styles.calendarContainer}>
          <Calendar
            current={getToday()} // Shows current month by default
            minDate={getCurrentMonthRange().start}
            maxDate={getCurrentMonthRange().end}
            hideExtraDays
            enableSwipeMonths={true}
            markedDates={markedDates}
            onDayPress={onDayPress}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#6B7280',
              selectedDayBackgroundColor: '#80C659',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#80C659',
              dayTextColor: '#1F2937',
              textDisabledColor: '#D1D5DB',
              dotColor: '#80C659',
              selectedDotColor: '#ffffff',
              arrowColor: '#80C659',
              monthTextColor: '#1F2937',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>
        {ProductData?.length ? (
          <View style={[tailwind('px-3')]}>
            <View  style={[tailwind('flex-row px-3 items-center')]}>
              <CalenderIconSubscription/>
               <Text style={[tailwind('font-bold px-2 py-3 text-black font-16')]}>
              Subscription Items
            </Text>
            </View>
           
            {ProductData?.map((item: any, index: any) => {
              return (
                <View
                  key={index}
                  style={[
                    tailwind('flex-row items-center rounded-xl mx-2 my-2 p-3'),
                    {
                      backgroundColor: 'white',
                      // width: '80%',
                      elevation: 3,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                      shadowOffset: { width: 0, height: 2 },
                    },
                  ]}
                >
                  {/* IMAGE */}
                  <TouchableOpacity
                    style={[tailwind(''), { width: '20%' }]}
                    activeOpacity={0.9}
                    // onPress={() => ImageOnlyView?.current?.open()}
                  >
                    <Image
                      source={item?.product_image}
                      defaultSource={assets_manifest?.placeholder}
                      resizeMode="contain"
                      style={{
                        width: '100%',
                        height: 80,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>

                  {/* DETAILS */}
                  <View style={{ width: '80%', marginLeft: 12 }}>
                    <Text
                      numberOfLines={1}
                      style={tailwind('font-15 font-bold text-gray-900')}
                    >
                      {item?.product_name}
                    </Text>
                    <View style={[tailwind('flex-row items-center my-1')]}>
                      <Text style={tailwind('font-12 text-gray-600')}>
                        {item?.product_price?.product_variation}{' '}
                        {item?.product_price?.product_unit} /
                      </Text>
                      <Text
                        style={[
                          tailwind('font-12 text-gray-600'),
                          { color: '#F39F3E' },
                        ]}
                      >
                        {''} {item?.order_type}
                      </Text>
                    </View>
                    <View style={[tailwind('flex-row')]}>
                      <View style={tailwind('flex-row items-center mt-2')}>
                        <Text
                          style={[
                            tailwind('font-16 font-bold'),
                            { color: '#F39F3E' },
                          ]}
                        >
                          ₹{item?.product_price?.product_price}
                        </Text>

                        {item?.product_variation?.mrp_price && (
                          <Text
                            style={tailwind(
                              'font-13 ml-2 text-gray-400 line-through',
                            )}
                          >
                            ₹{item?.product_variation?.mrp_price}
                          </Text>
                        )}
                      </View>
                      <View style={[tailwind('mr-3'), { marginLeft: 'auto' }]}>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  calendarHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  calendarSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
});
