import { Agenda } from 'react-native-calendars';
import React from 'react';
import {useState} from 'react';
import { View, Text } from 'react-native';

const timeToString=(time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

export default function Stats() {
  //const { username } = calendar;
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    const items = items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          
            items[strTime].push({
              name: 'Workout for ' + strTime,
              day: strTime
            });
          
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const today = timeToString(new Date().getTime());

  const renderItem = (item) => {
    return (
        <Text>{item.name}</Text>
    );
  };

  return (
    <View className="flex-1">
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        pastScrollRange={1} 
        futureScrollRange={2} 
        
        />

    </View>
  );
}
