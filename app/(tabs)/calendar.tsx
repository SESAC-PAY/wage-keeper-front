import { Text, StyleSheet, Image, Platform, View } from "react-native";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>캘린더 페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
