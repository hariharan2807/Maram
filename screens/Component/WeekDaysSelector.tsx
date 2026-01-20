import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Customized_days } from '@actions/userActions';
import tailwind from '@tailwind';
import { Calendar } from 'react-native-calendars';

const WEEK_DAYS = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
];

export default function WeekDaysSelector(props: any) {
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState(props?.Data || []);
  const [selectedDate, setSelectedDate] = useState(null); // SINGLE selected date
  const [markedDates, setMarkedDates] = useState({});
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Day mapping
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  // Get all visible dates based on selected days
  const getVisibleDates = days => {
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 1, 0); // End of next month

    const dates = [];
    const selectedDayNumbers = days.map(day => dayMap[day]);

    const currentDate = new Date(today);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();

      if (selectedDayNumbers.includes(dayOfWeek)) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(formattedDate);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Update marked dates when selectedDays or selectedDate changes
  useEffect(() => {
    const visibleDates = getVisibleDates(selectedDays);
    const marked = {};

    // Mark all visible dates (green)
    visibleDates.forEach(date => {
      marked[date] = {
        selected: true,
        selectedColor: '#009A93', // Default green for visible dates
        selectedTextColor: '#FFFFFF',
        disabled: false,
      };
    });

    // Mark the selected single date (orange)
    if (selectedDate && marked[selectedDate]) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: 'orange', // Orange for selected date
        selectedTextColor: '#FFFFFF',
      };
    }

    // Disable non-visible dates
    const allDates = getAllDatesBetween(new Date(), getEndOfNextMonthDate());
    allDates.forEach(date => {
      const dateStr = formatDate(date);
      if (!visibleDates.includes(dateStr)) {
        marked[dateStr] = {
          disabled: true,
          disableTouchEvent: true,
          selected: false,
        };
      }
    });

    setMarkedDates(marked);
  }, [selectedDays, selectedDate]);

  // Get all dates between two dates
  const getAllDatesBetween = (startDate, endDate) => {
    const dates = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // Get end of next month date object
  const getEndOfNextMonthDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2, 0); // end of next month
    return date;
  };

  // Get end of next month for calendar max date
  const getEndOfNextMonth = () => {
    return formatDate(getEndOfNextMonthDate());
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const toggleDay = (dayLabel: string) => {
    let newSelected: string[];

    if (selectedDays.includes(dayLabel)) {
      newSelected = selectedDays.filter(d => d !== dayLabel);

      // Clear selected date if it belongs to the removed day
      if (selectedDate) {
        const dateObj = new Date(selectedDate);
        const dayName = Object.keys(dayMap).find(
          key => dayMap[key] === dateObj.getDay(),
        );
        if (dayName === dayLabel) {
          setSelectedDate(null);
        }
      }
    } else {
      newSelected = [...selectedDays, dayLabel];
    }

    setSelectedDays(newSelected);
    // console.log('Selected Days:', newSelected);
    dispatch(Customized_days(newSelected));
  };

  // Handle date selection in calendar - SINGLE SELECTION
  const onDayPress = day => {
    const date = day.dateString;

    // Check if this date is visible (in selected days)
    const visibleDates = getVisibleDates(selectedDays);
    if (!visibleDates.includes(date)) {
      return; // Don't allow selection of disabled dates
    }

    // If clicking the same date, deselect it
    // If clicking a different date, select it
    if (selectedDate === date) {
      setSelectedDate(null); // Deselect
    } else {
      setSelectedDate(date); // Select new date
      props?.setSelectedDate([date]);
    }

    // console.log('Selected Date:', selectedDate === date ? null : date);
  };

  // Check if a date is visible
  const isDateVisible = dateStr => {
    const visibleDates = getVisibleDates(selectedDays);
    return visibleDates.includes(dateStr);
  };

  // Custom day component
  const DayComponent = ({ date, state }) => {
    const dateStr = date.dateString;
    const isVisible = isDateVisible(dateStr);
    const isSelected = selectedDate === dateStr;

    if (!isVisible) {
      // Hide non-visible dates
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

    return (
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? 'orange' : '#009A93',
          borderRadius: 18,
          width: 36,
          height: 36,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 2,
          opacity: state === 'disabled' ? 0.3 : 1,
        }}
        onPress={() => onDayPress({ dateString: dateStr })}
        disabled={state === 'disabled' || !isVisible}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    // Pass selected data back to parent component
    if (props.onConfirm) {
      props.onConfirm({
        selectedDays,
        selectedDate,
      });
    }

    dispatch(Customized_days(selectedDays));

    // Close the calendar
    setCalendarOpen(false);
  };

  if (!calendarOpen) {
    return (
      <View>
        {/* Day Selection Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>
            Select Days:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {WEEK_DAYS.map(day => (
              <TouchableOpacity
                key={day.value}
                onPress={() => toggleDay(day.label)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  margin: 5,
                  borderWidth: 2,
                  borderColor: selectedDays.includes(day.label)
                    ? '#80C659'
                    : '#e0e0e0',
                  borderRadius: 20,
                  backgroundColor: selectedDays.includes(day.label)
                    ? '#80C659'
                    : 'white',
                }}
              >
                <Text
                  style={{
                    color: selectedDays.includes(day.label) ? 'white' : '#666',
                    fontWeight: selectedDays.includes(day.label)
                      ? 'bold'
                      : 'normal',
                  }}
                >
                  {day.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Open Calendar Button - Only show if days are selected */}
        {selectedDays.length > 0 ? (
          <TouchableOpacity
            onPress={() => setCalendarOpen(true)}
            style={{
              padding: 15,
              backgroundColor: '#009A93',
              borderRadius: 8,
              alignItems: 'center',
              // marginTop: 10,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Click to Open Calendar ({selectedDays.length} days)
            </Text>
            <Text style={{ color: 'white', fontSize: 12, marginTop: 5 }}>
              {selectedDate
                ? `Selected Date : ${selectedDate}`
                : 'No date chosen'}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ color: '#666', textAlign: 'center', marginTop: 20 }}>
            Please select days first to open calendar
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{  }}>
      {/* Close Calendar Button */}
      <TouchableOpacity
        onPress={() => setCalendarOpen(false)}
        style={{
          alignSelf: 'flex-end',
          // padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: '#009A93', fontWeight: 'bold' }}>← Back</Text>
      </TouchableOpacity>

      {/* Selected Days Info */}
      <View style={{ marginBottom: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          Selected Days: {selectedDays.join(', ')}
        </Text>

        {selectedDate && (
          <Text style={{ color: '#009A93', fontWeight: 'bold', }}>
            Start Date: {selectedDate}
          </Text>
        )}
      </View>

      {/* Calendar */}
      <Calendar
        minDate={formatDate(new Date())}
        maxDate={getEndOfNextMonth()}
        hideExtraDays
        enableSwipeMonths={false}
        markedDates={markedDates}
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
        dayComponent={DayComponent}
      />
      {props?.save && (
        <View style={tailwind('flex-row justify-end mt-6')}>
          <TouchableOpacity
            onPress={() => {
              props?.setSelectedDate([]);
              setSelectedDate(null)
              setCalendarOpen(false);
            }}
            style={tailwind('px-6 py-3')}
          >
            <Text style={tailwind('text-gray-600 font-bold')}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleConfirm}
            disabled={!selectedDate}
            style={[
              tailwind('px-6 py-3 rounded-lg ml-4'),
              {
                backgroundColor: selectedDate ? '#10B981' : '#E5E7EB',
              },
            ]}
          >
            <Text style={tailwind('font-bold text-white')}>
              Confirm Selection
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
