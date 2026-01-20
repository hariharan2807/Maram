import { updateSubscription_start_date } from '@actions/userActions';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';

// Subscription Data


export const PauseSubscription = (props:any) => {
  const dispatch = useDispatch();
  
  // Local state variables
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [customDates, setCustomDates] = useState([]);
  const [calenderOpen, setCalenderOpen] = useState(true);

  // Function to format date as YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // Get today's date
  const today = new Date();

  // Function to get end of next month
  const getEndOfNextMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2, 0); // end of next month
    return formatDate(date);
  };

  // Function to get daily dates from start to end
  const getDailyDates = (startDate: string, endDate: string) => {
    const dates: string[] = [];
    let current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      dates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Function to get alternate dates
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

  // Function to get day name (sun, mon, etc.)
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[date.getDay()];
  };

  // Function to get dates for specific days of week
  const getCustomizedDates = (startDate: string, endDate: string, selectedDays: string[]) => {
    const dates: string[] = [];
    let current = new Date(startDate);
    const end = new Date(endDate);
    
    while (current <= end) {
      const dayName = getDayName(formatDate(current));
      if (selectedDays.includes(dayName)) {
        dates.push(formatDate(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD
  const convertToYYYYMMDD = (dateStr: string) => {
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };

  // Parse and initialize dates based on subscription data
  const initializeDates = () => {
    const plan = props?.SUBSCRIPTION_DATA?.subscription?.plan;
    const startDates = props?.SUBSCRIPTION_DATA?.subscription?.start_date;
    const selectedDays = props?.SUBSCRIPTION_DATA?.subscription?.start_days || [];
    const status = props?.SUBSCRIPTION_DATA?.subscription?.status;
    
    let dates: string[] = [];
    let firstDate = '';

    // Get end date (next month end)
    const endDateStr = getEndOfNextMonth();

    // Get start date
    let startDateStr = formatDate(today);
    if (startDates && startDates.length > 0) {
      const firstStartDate = Array.isArray(startDates) ? startDates[0] : startDates;
      startDateStr = convertToYYYYMMDD(firstStartDate);
    }

    if (plan === 'Daily') {
      dates = getDailyDates(startDateStr, endDateStr);
      firstDate = startDateStr;
    }
    else if (plan === 'Alternate Days') {
      dates = getAlternateDates(startDateStr, endDateStr);
      firstDate = startDateStr;
    }
    else if (plan === 'Customized') {
      dates = getCustomizedDates(startDateStr, endDateStr, selectedDays);
      firstDate = dates[0] || startDateStr;
    }

    return { dates, firstDate };
  };

  // Initialize on component mount
  useEffect(() => {
    const { dates, firstDate } = initializeDates();
    
    // Set the selected category from subscription plan
    if (props?.SUBSCRIPTION_DATA?.subscription?.plan) {
      setSelectedCategory(props?.SUBSCRIPTION_DATA.subscription.plan);
    }
    
    // Don't pre-select all dates - start with empty array
    // User will select dates manually
    setCustomDates([]);
    
    // Set first date
    if (firstDate) {
      setSelectedDate(firstDate);
    }
  }, []);

  const onDayPress = (day: any) => {
    const date = day.dateString;
    const plan = selectedCategory || props?.SUBSCRIPTION_DATA?.subscription?.plan;

    // Get current dates array
    let currentDates = [...customDates];
    
    // Toggle the date in array
    if (currentDates.includes(date)) {
      // Remove if already exists
      currentDates = currentDates.filter(d => d !== date);
    } else {
      // Add if not exists
      currentDates.push(date);
    }
    
    // Update the dates array
    setCustomDates(currentDates.sort());
  };

  // Prepare marked dates for calendar
  const markedDates = () => {
    const marked: any = {};
    const plan = selectedCategory || props?.SUBSCRIPTION_DATA?.subscription?.plan;
    
    // Mark ONLY user selected dates (orange)
    customDates.forEach(date => {
      marked[date] = {
        selected: true,
        selectedColor: 'orange',
      };
    });

    return marked;
  };

  // Function to check if a date is visible/selectable
  const isDateSelectable = (dateStr: string) => {
    const plan = selectedCategory || props?.SUBSCRIPTION_DATA?.subscription?.plan;
    const { dates: visibleDates } = initializeDates();
    return visibleDates.includes(dateStr);
  };
  const getVisibleDates = () => {
    const plan = selectedCategory || props?.SUBSCRIPTION_DATA?.subscription?.plan;
    const { dates } = initializeDates();
    return dates;
  };

  const onOkPress = () => {
    console.log('User selected dates:', customDates);
    
    // Send user selected dates to dispatch
    if (customDates.length > 0) {
      setSelectedDate(customDates[0]);
      dispatch(updateSubscription_start_date(customDates));
    } else {
      // No dates selected, use first visible date
      const { firstDate } = initializeDates();
      setSelectedDate(firstDate);
      dispatch(updateSubscription_start_date([firstDate]));
    }
    props?.setPause(false)
    setCalenderOpen(false);
    
  };

  const onCancelPress = () => {
    // Reset to empty
    setCustomDates([]);
    const { firstDate } = initializeDates();
    setSelectedDate(firstDate);
    setCalenderOpen(false);
  };

  // Don't render if calendar is closed
  if (!calenderOpen) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Calendar
        minDate={formatDate(new Date())}
        maxDate={getEndOfNextMonth()}
        hideExtraDays
        enableSwipeMonths={false}
        markedDates={markedDates()}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: 'orange',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#009A93',
          arrowColor: '#009A93',
          textSectionTitleColor: '#000',
          monthTextColor: '#000',
          dayTextColor: '#000',
          textDisabledColor: '#CCCCCC'
        }}
        // Custom day component
        dayComponent={({ date, state }: any) => {
          const dateStr = date.dateString;
          const isSelectable = isDateSelectable(dateStr);
          const isUserSelected = customDates.includes(dateStr);
          const visibleDates = getVisibleDates();
          const isVisible = visibleDates.includes(dateStr);
          
          // Hide dates that shouldn't be visible
          if (!isVisible) {
            return (
              <View style={{
                width: 36,
                height: 36,
                margin: 2,
              }} />
            );
          }
          
          return (
            <TouchableOpacity
              style={{
                backgroundColor: isUserSelected ? 'orange' : 'transparent',
                borderWidth: 1,
                borderColor: '#009A93',
                borderRadius: 10,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 2,
              }}
              onPress={() => {
                if (isSelectable) {
                  onDayPress({ dateString: dateStr });
                }
              }}
              disabled={!isSelectable || state === 'disabled'}
            >
              <Text
                style={{
                  color: isUserSelected ? '#FFFFFF' : '#009A93',
                  fontWeight: isUserSelected ? 'bold' : 'normal',
                  fontSize: 14,
                }}
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
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
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    // padding: 5,
    // margin: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 16,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
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