import { Agenda } from 'react-native-calendars';
import React from 'react';
import {useState} from 'react';
import { View } from 'react-native';

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
          
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

      

  return (
    <View className="flex-1">
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2024-02-18'}
        />

    </View>
  );
}
