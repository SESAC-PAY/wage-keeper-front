import React from "react";
import { Text, Dimensions, View, StyleSheet } from "react-native";

interface LocationItemProps {
  time: string;
  location: string;
}

export function LocationItem({ time, location }: LocationItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.bar} />
      <Text style={styles.location}>{location}</Text>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  time: {
    fontSize: 16,
    textAlign: "center",
    width: 50,
  },
  bar: {
    width: 2,
    height: "100%",
    backgroundColor: "#B0B0B0",
  },
  location: {
    flex: 1,
    backgroundColor: "#B7E1FF",
    fontSize: 16,
    textAlign: "left",
    padding: 5,
  },
});
