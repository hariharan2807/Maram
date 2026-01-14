import { updateSubscription_start_date } from '@actions/userActions';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';

export const CalenderComponent = (props: any) => {
  const dispatch = useDispatch();

  const formatDate = date => date.toISOString().split('T')[0];

  const addDays = (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return formatDate(date);
  };
  const today = new Date();

  //   const markedDates1 = {
  //     ...getDisabledPastDates(),

  //     ...(props?.selectedDate && {
  //       [props?.selectedDate]: {
  //         selected: true,
  //         selectedColor: '#009A93',
  //         selectedTextColor: '#ffffff',
  //       },
  //     }),
  //   };
  const onDayPress = day => {
    const date = day.dateString;

    if (props?.selectedCat === 'Alternate Days') {
      const alternateDates = getAlternateDates(date, getEndOfNextMonth());

      props?.setSelectedDate(date);
      props?.setCustomDates(alternateDates);
      //   props?.setCalenderOpen(false);
      //   dispatch(updateSubscription_start_date(alternateDates));
    }

    if (props?.selectedCat === 'Daily') {
      props?.setSelectedDate(date);
      props?.setCustomDates([date]);
      //   props?.setCalenderOpen(false);

      //   dispatch(updateSubscription_start_date([date]));
    }

    if (props?.selectedCat === 'Customized') {
      let updatedDates = [];

      if (props?.customDates.includes(date)) {
        updatedDates = props?.customDates.filter(d => d !== date);
      } else {
        updatedDates = [...props?.customDates, date];
      }

      props?.setCustomDates(updatedDates);
      props?.setSelectedDate(null);
      //   props?.setCalenderOpen(false);

      //   dispatch(updateSubscription_start_date(updatedDates));
    }
  };

  console.log('setCustomDatessetCustomDatessetCustomDates', props?.customDates);
  const getAlternateDisabledDates = () => {
    const disabled = {};

    if (!props?.selectedDate) return disabled;

    const allowedDate = addDays(props?.selectedDate, 2);

    for (let i = 1; i <= 365; i++) {
      const date = new Date(props?.selectedDate);
      date.setDate(date.getDate() + i);
      const d = formatDate(date);

      if (d !== allowedDate) {
        disabled[d] = {
          disabled: true,
          disableTouchEvent: true,
        };
      }
    }

    return disabled;
  };
  const markedDates1 = {
    ...(props?.selectedCat === 'Alternate Days' &&
      props?.customDates.reduce((acc, date) => {
        acc[date] = {
          selected: true,
          selectedColor: '#009A93',
        };
        return acc;
      }, {})),

    ...(props?.selectedCat === 'Daily' &&
      props?.selectedDate && {
        [props?.selectedDate]: {
          selected: true,
          selectedColor: '#009A93',
        },
      }),
    ...(props?.selectedCat === 'Customized' &&
      props?.customDates.reduce((acc, date) => {
        acc[date] = {
          selected: true,
          selectedColor: '#009A93',
        };
        return acc;
      }, {})),
  };

  const getEndOfNextMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2, 0); // end of next month
    return formatDate(date);
  };
  const getAlternateDates = (startDate: string, endDate: string) => {
    const dates: string[] = [];
    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      dates.push(formatDate(current));
      current.setDate(current.getDate() + 2); // alternate day
    }

    return dates;
  };
  const onOkPress = () => {
    props?.setSelectedDate(props?.customDates);
    props?.setCustomDates(props?.customDates);

    dispatch(updateSubscription_start_date(props?.customDates));

    props?.setCalenderOpen(false);
  };

  const onCancelPress = () => {
    props?.setSelectedDate(props?.customDates);
    props?.setCustomDates([]);

    props?.setCalenderOpen(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Calendar
          minDate={formatDate(new Date())}
          maxDate={getEndOfNextMonth()}
          hideExtraDays
          enableSwipeMonths={false}
          markedDates={markedDates1}
          onDayPress={onDayPress}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancelPress}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.okBtn} onPress={onOkPress}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
  okBtn: {
    backgroundColor: '#009A93',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  okText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
};
