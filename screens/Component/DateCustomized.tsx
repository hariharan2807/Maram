import React from 'react';
import { View, Text } from 'react-native';
import { CalenderComponent } from './CalenderComponen';
import WeekDaysSelector from './WeekDaysSelector';
import tailwind from '@tailwind';
export const DateCustomized = (props: any) => {
  // console.log("props?.Dataprops?.Data",props?.Data)
  return (
    <>
      {props?.calenderOpen && props?.selectedCat !== 'Customized' && (
        <CalenderComponent
          setSelectedDate={props?.setSelectedDate}
          selectedCat={props?.selectedCat}
          setSelectedCat={props?.setSelectedCat}
          selectedDate={props?.selectedDate}
          setCustomDates={props?.setCustomDates}
          customDates={props?.customDates}
          calenderOpen={props?.calenderOpen}
          setCalenderOpen={props?.setCalenderOpen}
        />
      )}

      {props?.selectedCat === 'Customized' && (
        <WeekDaysSelector Data={props?.Data} save={props?.save} setSelectedDate={props?.setSelectedDate}/>
      )}
      {!!(props?.subscription_start_date?.length || props?.total) &&
        props?.new && (
          // props?.selectedCat !== 'Customized' &&
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
              {props?.totalAmount} x {''}
              {props?.subscription_start_date?.length
                ? props?.subscription_start_date?.length
                : props?.total}{' '}
              Days
            </Text>
            <Text style={[tailwind('font-bold')]}>
              | ₹
              {props?.totalAmount *
                (props?.subscription_start_date?.length || props?.total)}
            </Text>
          </View>
        )}
    </>
  );
};
