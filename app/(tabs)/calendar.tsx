import React, { useState } from "react";
import { Text, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { LocationItem } from "@/components/calendar/LocationItem";

export default function CalendarScreen() {
  const [selected, setSelected] = useState("");

  const dummyData = [
    { time: "09:00", location: "Location 1" },
    { time: "10:00", location: "Location 2" },
    { time: "11:00", location: "Location 3" },
    { time: "12:00", location: "Location 4" },
    { time: "13:00", location: "Location 5" },
    { time: "14:00", location: "Location 6" },
    { time: "15:00", location: "Location 7" },
    { time: "16:00", location: "Location 8" },
    { time: "17:00", location: "Location 9" },
    { time: "18:00", location: "Location 10" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Calendar
        style={styles.calendar}
        theme={{
          todayTextColor: "#00adf5",
        }}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "#10BCE2",
          },
        }}
      />
      <View style={styles.dateContainer}>
        <Text>Selected Date: {selected}</Text>
      </View>
      {dummyData.map((item, index) => (
        <LocationItem key={index} time={item.time} location={item.location} />
      ))}
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  calendar: {
    width: width - 20,
    height: 350,
    borderRadius: 20,
  },
  dateContainer: {
    padding: 10,
    marginTop: 20,
    flexDirection: "column",
    gap: 4,
  },
});
