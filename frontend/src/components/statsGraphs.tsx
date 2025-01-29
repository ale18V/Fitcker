import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {LineChart} from "react-native-chart-kit";

export default function StatsGraphs({ statsGraph }) {
  const { exercises } = statsGraph;
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [chartData, setChartData] = useState([0,0,0,0,0,0]);

  useEffect(() => {
    generateChartData();
  }, [selectedExercise]);

  const generateChartData = () => {
    const newData = [];
    let prevValue = Math.random() * 100; 

    for (let i = 0; i < 6; i++) {
      newData.push(prevValue);
      prevValue += Math.random() * 10; 
    }

    setChartData(newData);
  };

  const handleExerciseChange = (itemValue) => {
    setSelectedExercise(itemValue);
  };

  return (
    <View className = "flex-1 items-center mt-12" >
      <Picker
        selectedValue={selectedExercise}
        style={{ height: 50, width: 250, zIndex: 1 }}
        onValueChange={handleExerciseChange}>
        {exercises.map((exercise, index) => (
          <Picker.Item key={index} label={exercise} value={exercise} />
        ))}
      </Picker>

      <View className = "flex-1 items-center justify-center">
        <Text className = "font-bold">{selectedExercise} PR</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
              {
                data: chartData
              }
            ]
          }}
          width={Dimensions.get("window").width * 0.9}
          height={220}
          yAxisSuffix="lbs"
          chartConfig={{
            backgroundGradientFrom: "#57CC99",
            backgroundGradientTo: "#4BD0D3",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
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
    </View>
  );
}
