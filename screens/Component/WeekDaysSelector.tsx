import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Customized_days } from '@actions/userActions';
import tailwind from '@tailwind';

const WEEK_DAYS = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
];

export default function WeekDaysSelector() {
  const dispatch = useDispatch();
  const Data = useSelector((state: any) => state.user.customized_dayss);

  // Initialize selectedDays from Redux (array of labels)
  const [selectedDays, setSelectedDays] = useState(Data || []);

  const toggleDay = (dayLabel: string) => {
    let newSelected: string[];

    if (selectedDays.includes(dayLabel)) {
      // Remove if already selected
      newSelected = selectedDays.filter(d => d !== dayLabel);
    } else {
      // Add if not selected
      newSelected = [...selectedDays, dayLabel];
    }

    setSelectedDays(newSelected);
    dispatch(Customized_days(newSelected));
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {WEEK_DAYS.map(day => (
        <TouchableOpacity
          key={day.value}
          onPress={() => toggleDay(day.label)}
          style={{
            padding: 6,
            margin: 5,
            borderWidth: 1,
            borderColor: selectedDays.includes(day.label) ? '#80C659' : 'gray',
            borderRadius: 50,
            backgroundColor: selectedDays.includes(day.label)
              ? '#80C659'
              : 'white',
          }}
        >
          <Text
            style={[
              tailwind(''),
              { color: selectedDays.includes(day.label) ? 'white' : 'black' },
            ]}
          >
            {day.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
