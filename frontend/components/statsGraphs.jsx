import React from 'react';
import { View, Text } from 'react-native';
import {Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";

export default function StatsGraphs({statsGraph}) {
  const { exercise } = statsGraph;
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mt-5 font-bold">{exercise} PR</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width*0.9} // from react-native
        height={220}
        yAxisSuffix="lbs"
        chartConfig={{
          backgroundGradientFrom: "#57CC99",
          backgroundGradientTo: "#4BD0D3",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
}
