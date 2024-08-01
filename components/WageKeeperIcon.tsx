import { Image, View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

export function WageKeeperIcon() {
  const wageKeeperImgSrc = require("../assets/images/wageKeeper.png");

  return (
    <View style={styles.iconContainer}>
      <Image
        source={wageKeeperImgSrc}
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
        }}
      />
      <Text style={styles.koreanName}>임금지키미</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  koreanName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  engName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666666",
  },
  boxShadow: {
    shadowColor: "#333333",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
