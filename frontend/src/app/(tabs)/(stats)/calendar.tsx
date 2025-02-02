import { Agenda } from "react-native-calendars";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PlanRead, PlansService, WorkoutRead, WorkoutsService } from "$/api";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export default function StatsCalendar() {
  // const { username } = calendar;

  const today = timeToString(new Date().getTime());

  const [items, setItems] = useState({});
  const [workouts, setWorkouts] = useState<WorkoutRead[]>([]);
  const [plans, setPlans] = useState<PlanRead[]>([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await WorkoutsService.getWorkouts();
        if (response.data) {
          setWorkouts(response.data);
        }
        throw response.error;
      } catch (error) {
        //console.log(workouts);
        console.error("Error fetching workouts:", error);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await PlansService.getPlans()
        if(response.data) {
          setPlans(response.data);
        }
        throw response.error;
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchWorkouts();
    fetchPlans();
    //setItems(null);
  }, [refresh]);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        {item.weight && (
          <MaterialCommunityIcons
            name="dumbbell"
            size={80}
            color="#58a1a3"
            style={{ marginRight: 10 }}
          />
        )}
        {item.name && (
          <MaterialCommunityIcons
            name="note"
            size={80}
            color="#58a1a3"
            style={{ marginRight: 10 }}
          />
        )}
        <View style={{ flexDirection: "column", marginLeft: 20 }}>
          {item.name && <Text>Plan: {item.name}</Text>}
          {item.exercise && <Text>Exercise: {item.exercise}</Text>}
          {item.date && <Text>Date: {item.date}</Text>}
          {item.weight && <Text>Weight: {item.weight}</Text>}
          {item.rest && <Text>Rest: {item.rest}</Text>}
          {item.reps && <Text>Reps: {item.reps}</Text>}
          {item.set && <Text>Sets: {item.set}</Text>}
          {item.start_date && (
            <Text>Start date: {timeToString(item.start_date)}</Text>
          )}
          {item.end_date && (
            <Text>End date: {timeToString(item.end_date)}</Text>
          )}
        </View>
      </View>
    );
  };

  const refreshItems = () => {
    setRefresh(!refresh);
  };


  return (
    <View className="flex-1">
      <Agenda
        items={items}
        loadItemsForMonth={(day) => {
          const items = items || {};

          setTimeout(() => {
            refreshItems();
            for (let i = -30; i < 30; i++) {
              if (!day) {
                break;
              }
              const time = day.timestamp + i * 24 * 60 * 60 * 1000;
              const strTime = timeToString(time);

              items[strTime] = [];

              workouts.map((workout) => {
                //console.log(JSON.stringify(workout));
                var date = timeToString(workout.day);
                if (date === strTime) {
                  items[strTime].push(workout);
                }
              });
              plans.map((plan) => {
                var date = plan.end_date;
                var date2 = plan.start_date;
                console.log("date: " + date);
                console.log("date2: " + date2);
                console.log("item date: " + strTime);
                if (date === strTime || date2 === strTime) {
                  items[strTime].push(plan);
                }
              });

              //console.log(items[strTime])
              if (items[strTime].length != 0) {
                //items[strTime] = [];
                //console.log(items[strTime]);
              }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
              newItems[key] = items[key];
            });
            setItems(newItems);
            console.log("items:   -------" + JSON.stringify(items));
            console.log("--------------");
          }, 1000);
        }}
        selected={today}
        onDayPress={(day) => {
          console.log("day pressed");
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {
          console.log("day changed");
        }}
        // Specify how each item should be rendered in agenda
        renderItem={renderItem}
        refreshing={false}
        pastScrollRange={15}
        futureScrollRange={15}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: "row",
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "green",
  },
  dayItem: {
    marginLeft: 34,
  },
});
