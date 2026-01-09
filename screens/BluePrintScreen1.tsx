import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function BluePrintScreen() {
  const screenWidth = Dimensions.get('window').width;
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const labels = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec',
  ];
  const barData = [100,180,250,220,340,300,400,280,350,500,420,480];

  const data = barData.map((value, index) => ({
    value,
    label: labels[index],
    frontColor: index === focusedIndex ? '#FF7F50' : '#00FFAA',
    dataPointText: `₹${value}`,
    showDataPoint: true,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 50 }}>
      <Text style={{ color:'#00FFAA', fontSize:18, fontWeight:'600', textAlign:'center', marginBottom:10 }}>
        Monthly Data (Horizontal Bar Chart)
      </Text>

      <BarChart
        data={data}
        width={screenWidth - 20}
        height={400}
        barWidth={18}
        spacing={20}
        isHorizontal
        showGradient
        backgroundColor="#000"
        yAxisTextStyle={{ color: '#fff', fontSize: 12 }}
        xAxisLabelTextStyle={{ color: '#fff', fontSize: 12 }}
        onPress={(item, index) => setFocusedIndex(index)}
      />
    </View>
  );
}
