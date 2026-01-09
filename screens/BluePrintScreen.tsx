import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, PanResponder } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
// import { LineChart } from 'react-native-chart-kit';
export default function BluePrintScreenlineChat() {
  const screenWidth = Dimensions.get('window').width;
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const barLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const barDataValues = [
    100, 180, 250, 220, 340, 300, 400, 280, 350, 500, 420, 480,
  ];
  const barData = barDataValues.map((value, index) => ({
    value,
    label: barLabels[index],
    frontColor: index === focusedIndex ? '#FF7F50' : '#00FFAA',
    showDataPoint: true,
    topLabelComponent:
      index === focusedIndex
        ? () => (
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 6,
                // marginBottom: 4,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
                // remove width: '100%'
                alignSelf: 'center', 
              }}
            >
              <Text
                style={{
                  color: 'black',
                  width: '100%',
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                ₹{value}
              </Text>
            </View>
          )
        : null,
  }));
  // console.log('barDatabarData', barData);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const lineDataValues = [
    80, 150, 200, 210, 300, 280, 370, 250, 320, 460, 400, 450,
  ];
  const chartWidth = screenWidth - 20;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => handleTouch(gestureState.x0),
    onPanResponderMove: (evt, gestureState) => handleTouch(gestureState.moveX),
  });
  const handleTouch = touchX => {
    // Get the actual X coordinate relative to the chart
    // If the chart has margin or padding, you need to offset it
    const chartOffset = 10; // adjust if your chart has left padding/margin
    const xRelative = touchX - chartOffset;
  
    // Calculate spacing between points
    const spacing = chartWidth / (lineDataValues.length - 1);
  
    // Determine nearest index
    let index = Math.round(xRelative / spacing);
    index = Math.max(0, Math.min(lineDataValues.length - 1, index));
  
    // Set selected state
    setSelectedIndex(index);
    setSelectedValue(lineDataValues[index]);
  };
  
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#000' }}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={{ paddingTop: 50, alignItems: 'center' }}>
        {/* <BarChart
          data={barData}
          width={screenWidth - 20}
          height={300}
          barWidth={18}
          spacing={20}
          yAxisColor={'white'}
          xAxisColor={'white'}
          isHorizontal
          showGradient
          backgroundColor="#000"
          yAxisTextStyle={{ color: '#fff', fontSize: 12 }}
          xAxisLabelTextStyle={{ color: '#fff', fontSize: 12 }}
          onPress={(item, index) => setFocusedIndex(index)}
        /> */}
      </View>
      <View style={{ paddingTop: 50, alignItems: 'center' }}>
        <View {...panResponder.panHandlers}>
          {/* <LineChart
            data={{
              labels: barLabels,
              datasets: [{ data: lineDataValues }],
            }}
            width={chartWidth}
            height={250}
            yAxisLabel="₹"
            fromZero
            chartConfig={{
              backgroundColor: '#1E2923',
              backgroundGradientFrom: '#08130D',
              backgroundGradientTo: '#1E2923',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 255, 170, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: { r: '5', strokeWidth: '2', stroke: '#00FFAA' },
            }}
            // bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
            renderDotContent={({ x, y, index }) => {
              if (selectedIndex === index) {
                return (
                  <View key={index}>
                    <View
                      style={{
                        position: 'absolute',
                        left: x - 1,
                        top: 0,
                        width: 2,
                        height: 200,
                        backgroundColor: 'white',
                        opacity: 0.8,
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        left: x - 6,
                        top: y - 6,
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: '#00FFAA',
                        borderWidth: 2,
                        borderColor: '#fff',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: y - 40,
                        left: x - 20,
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 6,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          shadowColor: '#000',
                          shadowOpacity: 0.2,
                          shadowRadius: 3,
                          elevation: 3,
                        }}
                      >
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 12,
                            fontWeight: '600',
                          }}
                        >
                          ₹{lineDataValues[index]}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }
              return null;
            }}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
}
