// Simple Calendar Component (put this in your file)
import tailwind from "@tailwind";
import React from "react";
import { useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";
// Simple Calendar Component
export const SimpleCalendar = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get days in month
  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  // Generate calendar grid
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // Empty days before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Check if date is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (day) => {
    if (!selectedDate || !day) return false;
    const [selectedDay, selectedMonth, selectedYear] = selectedDate.split('/');
    return (
      day === parseInt(selectedDay) &&
      currentMonth === parseInt(selectedMonth) - 1 &&
      currentYear === parseInt(selectedYear)
    );
  };

  // Handle day press
  const handleDayPress = (day) => {
    if (!day) return;
    const dateString = `${day}/${currentMonth + 1}/${currentYear}`;
    onDateSelect(dateString);
  };

  // Navigate months
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = generateCalendar();

  return (
    <View style={tailwind('bg-white rounded-xl')}>
      {/* Header */}
      <View style={tailwind('flex-row items-center justify-between mb-4')}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={tailwind('text-2xl text-gray-600')}>‹</Text>
        </TouchableOpacity>
        <Text style={tailwind('text-xl font-bold text-gray-900')}>
          {months[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={tailwind('text-2xl text-gray-600')}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday headers */}
      <View style={tailwind('flex-row mb-3')}>
        {weekDays.map(day => (
          <View key={day} style={tailwind('flex-1 items-center')}>
            <Text style={tailwind('text-gray-500 font-bold')}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={tailwind('flex-row flex-wrap')}>
        {calendarDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDayPress(day)}
            disabled={!day}
            style={[
              tailwind('w-10 h-10 items-center justify-center m-0.5 rounded-full'),
              {
                backgroundColor: isSelected(day)
                  ? '#10B981'
                  : isToday(day)
                  ? '#DBEAFE'
                  : 'transparent',
              },
            ]}
          >
            {day ? (
              <Text
                style={[
                  tailwind('font-bold'),
                  {
                    color: isSelected(day)
                      ? 'white'
                      : isToday(day)
                      ? '#3B82F6'
                      : '#374151',
                  },
                ]}
              >
                {day}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
 