import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, SectionList, ScrollView, Button, Alert } from "react-native";
import Constants from 'expo-constants';
import Checkbox from 'expo-checkbox'

const MarkSets = () => {

  const routines = [
    { id: 'crd', name: 'Cardio', data: [
      { key: 'crd1', value: 'Squat Jump' },
      { key: 'crd2', value: 'Mountain Climber' },
      { key: 'crd3', value: 'Running' },
    ],},
    { id: 'flx', name: 'Flexibility', data:  [
      { key: 'flx1', value: 'Yoga' },
      { key: 'flx2', value: 'Pilates' },
      { key: 'flx3', value: 'Lunge with Spinal Twist' },
    ],},
    { id: 'str', name: 'Strength', data: [
      { key: 'str1', value: 'Deadlift' },
      { key: 'str2', value: 'Walking Lunge' },
      { key: 'str3', value: 'Bench Press' },
    ], },
    { id: 'lgdy', name: 'Leg Day', data: [
      { key: 'lgdy1', value: 'Back Squat' },
      { key: 'lgdy2', value: 'Leg Press' },
      { key: 'lgdy3', value: 'Leg Curl' },
    ], },
    { id: 'tu', name: 'Tuesdays', data: [
      { key: 'tu1', value: 'Incline Jog' },
      { key: 'tu2', value: 'Push-ups' },
      { key: 'tu3', value: 'Squats' },
    ], },
    { id: 'th', name: 'Thursdays', data: [
      { key: 'th1', value: 'Pull-ups' },
      { key: 'th2', value: 'Spider Curl' },
      { key: 'th3', value: 'Bench Dip' },
    ], },
    { id: '30m', name: '30 minute', data: [
      { key: '30m1', value: 'Walking Lunge' },
      { key: '30m2', value: 'Romanian Deadlift' },
      { key: '30m3', value: 'Suitcase Carry' },
    ] },
  ]


  

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const Item = ({ item }) => {
    return (
        <View style={styles.item}>
          <Text style={styles.title}>{item.value}</Text>
        </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Test:</Text>
      
      <SectionList
      sections={routines}
      keyExtractor={(item, index) => item.key}
      renderItem={({ item }) => <Item item={item} />}
      renderSectionHeader={({ section }) => (
        <Text style={styles.header}>{section.name}</Text>
      )}
    />
      
      <View style={styles.row}>
        <Checkbox
          style={styles.button}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />

        <Checkbox
          style={styles.button}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Checkbox
          style={styles.button}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Checkbox
          style={styles.button}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginLeft: 20,
    color: '#f3fff5',
    backgroundColor: '#58a1a3',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#white',
  },
  item: {
    backgroundColor: 'f3fff5',
    padding: 10,
    marginVertical: 5,
    fontSize: 10,
  },
  header: {
    fontSize: 20,
    backgroundColor: '#f3fff5',
  },
  title: {
    fontSize: 10,
  },
});

export default MarkSets;

