import { updateSubscription_start_date } from '@actions/userActions';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
export const PauseSubscription = (props: any) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datesToPause, setDatesToPause] = useState([]);
  const [datesToUnpause, setDatesToUnpause] = useState([]);
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [originalPausedDates, setOriginalPausedDates] = useState([]); 
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const today = new Date();
  const getEndOfNextMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1, 0); 
    return formatDate(date);
  };
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
  const getAlternateDates = (startDate: string, endDate: string) => {
    const dates: string[] = [];
    let current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      dates.push(formatDate(current));
      current.setDate(current.getDate() + 2); 
    }
    return dates;
  };
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[date.getDay()];
  };
  const getCustomizedDates = (
    startDate: string,
    endDate: string,
    selectedDays: string[],
  ) => {
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
  const convertToYYYYMMDD = (dateStr: string) => {
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };
  const initializeDates = () => {
    const plan = props?.SUBSCRIPTION_DATA?.subscription?.plan;
    const startDates = props?.SUBSCRIPTION_DATA?.subscription?.start_date;
    const selectedDays = props?.SUBSCRIPTION_DATA?.subscription?.start_days || [];
    const pauseDates = props?.SUBSCRIPTION_DATA?.subscription?.pause_subscription || [];

    let dates: string[] = [];
    let firstDate = '';
    const endDateStr = getEndOfNextMonth();
    let startDateStr = formatDate(today);
    if (startDates && startDates.length > 0) {
      const firstStartDate = Array.isArray(startDates) ? startDates[0] : startDates;
      startDateStr = convertToYYYYMMDD(firstStartDate);
    }
    if (plan === 'Daily') {
      dates = getDailyDates(startDateStr, endDateStr);
      firstDate = startDateStr;
    } else if (plan === 'Alternate Days') {
      dates = getAlternateDates(startDateStr, endDateStr);
      firstDate = startDateStr;
    } else if (plan === 'Customized') {
      dates = getCustomizedDates(startDateStr, endDateStr, selectedDays);
      firstDate = dates[0] || startDateStr;
    }
    return { dates, firstDate };
  };
  const getVisibleDates = () => {
    const { dates } = initializeDates();
    return dates;
  };
  useEffect(() => {
    const { dates, firstDate } = initializeDates();
    if (props?.SUBSCRIPTION_DATA?.subscription?.plan) {
      setSelectedCategory(props?.SUBSCRIPTION_DATA.subscription.plan);
    }
    if (firstDate) {
      setSelectedDate(firstDate);
    }
  }, []);
  useEffect(() => {
    const pauseDates = props?.SUBSCRIPTION_DATA?.subscription?.pause_subscription || [];
    setOriginalPausedDates(pauseDates);
    setDatesToPause([]);
    setDatesToUnpause([]);
  }, [props?.SUBSCRIPTION_DATA]);
  const isDateCurrentlyPaused = (dateStr: string) => {
    return originalPausedDates.includes(dateStr);
  };
  const isDateToBeUnpaused = (dateStr: string) => {
    return datesToUnpause.includes(dateStr);
  };
  const isDateToBePaused = (dateStr: string) => {
    return datesToPause.includes(dateStr);
  };
  const onDayPress = (day: any) => {
    const date = day.dateString;
    const isVisible = getVisibleDates().includes(date);
    if (!isVisible) return;
    const currentlyPaused = isDateCurrentlyPaused(date);
    const toBeUnpaused = isDateToBeUnpaused(date);
    const toBePaused = isDateToBePaused(date);
    if (currentlyPaused) {
      if (!toBeUnpaused) {
        setDatesToUnpause([...datesToUnpause, date]);
      }
      else {
        setDatesToUnpause(datesToUnpause.filter(d => d !== date));
      }
      setDatesToPause(datesToPause.filter(d => d !== date));
    } 
    else {
      if (!toBePaused) {
        setDatesToPause([...datesToPause, date]);
        setDatesToUnpause(datesToUnpause.filter(d => d !== date));
      } 
      else {
        setDatesToPause(datesToPause.filter(d => d !== date));
      }
    }
  };
  const markedDates = () => {
    const marked: any = {};
    const visibleDates = getVisibleDates();
    visibleDates.forEach(date => {
      marked[date] = {
        selected: true,
        selectedColor: '#009A93',
        selectedTextColor: '#FFFFFF',
      };
    });
    datesToPause.forEach(date => {
      if (marked[date]) {
        marked[date] = {
          ...marked[date],
          selected: true,
          selectedColor: 'orange',
          selectedTextColor: '#FFFFFF',
        };
      }
    });
    datesToUnpause.forEach(date => {
      if (marked[date]) {
        marked[date] = {
          ...marked[date],
          selected: true,
          selectedColor: 'yellow',
          selectedTextColor: '#000000',
        };
      }
    });
    originalPausedDates.forEach(date => {
      if (marked[date] && !datesToUnpause.includes(date)) {
        marked[date] = {
          ...marked[date],
          selected: true,
          selectedColor: 'red', 
          selectedTextColor: '#FFFFFF',
        };
      }
    });
    return marked;
  };
  const isDateClickable = (dateStr: string) => {
    const isVisible = getVisibleDates().includes(dateStr);
    return isVisible;
  };
  const onOkPress = () => {
    const apiData = {
      subscription_id:props?.SUBSCRIPTION_DATA?.subscription?.subscription_id,
      pause_subscription: datesToPause, 
      unpause_subscription: datesToUnpause,
    };
    console.log('API Data to send:apiData', apiData);
    if (props.onDatesUpdated) {
      props.onDatesUpdated(apiData);
    }
    props?.setPause(false);
    setCalendarOpen(false);
  };
  const onCancelPress = () => {
    setDatesToPause([]);
    setDatesToUnpause([]);
    props?.setPause(false);
  };
  if (!calendarOpen) {
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
          selectedDayBackgroundColor: '#009A93',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#009A93',
          arrowColor: '#009A93',
          textSectionTitleColor: '#000',
          monthTextColor: '#000',
          dayTextColor: '#000',
          textDisabledColor: '#CCCCCC',
        }}
        dayComponent={({ date, state }: any) => {
          const dateStr = date.dateString;
          const isClickable = isDateClickable(dateStr);
          const toBePaused = isDateToBePaused(dateStr);
          const toBeUnpaused = isDateToBeUnpaused(dateStr);
          const currentlyPaused = isDateCurrentlyPaused(dateStr);
          const isVisible = getVisibleDates().includes(dateStr);
          if (!isVisible) {
            return (
              <View
                style={{
                  width: 36,
                  height: 36,
                  margin: 2,
                }}
              />
            );
          }
          let backgroundColor = '#009A93'; 
          if (currentlyPaused && !toBeUnpaused) {
            backgroundColor = 'red'; 
          } else if (toBePaused) {
            backgroundColor = 'orange'; 
          } else if (toBeUnpaused) {
            backgroundColor = 'yellow'; 
          }
          return (
            <TouchableOpacity
              style={{
                backgroundColor: backgroundColor,
                borderRadius: 18,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 2,
                opacity: state === 'disabled' ? 0.5 : 1,
              }}
              onPress={() => {
                if (isClickable && state !== 'disabled') {
                  onDayPress({ dateString: dateStr });
                }
              }}
              disabled={!isClickable || state === 'disabled'}
            >
              <Text
                style={{
                  color: backgroundColor === 'yellow' ? '#000000' : 'white',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                {date.day}
              </Text>
              {toBePaused && (
                <View
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10 }}>P</Text>
                </View>
              )}
              {toBeUnpaused && (
                <View
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                  }}
                >
                  <Text style={{ color: 'black', fontSize: 10 }}>U</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancelPress}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.okBtn, 
            { 
              opacity: (datesToPause.length > 0 || datesToUnpause.length > 0) ? 1 : 0.5 
            }
          ]} 
          onPress={onOkPress}
          disabled={datesToPause.length === 0 && datesToUnpause.length === 0}
        >
          <Text style={styles.okText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#009A93' }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'orange' }]} />
          <Text style={styles.legendText}>To Pause</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
          <Text style={styles.legendText}>Currently Paused</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'yellow' }]} />
          <Text style={styles.legendText}>To Unpause</Text>
        </View>
      </View>
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  summaryContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryDates: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
};