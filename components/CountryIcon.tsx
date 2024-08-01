import { Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const images = {
  china: require("../assets/images/china.png"),
  vietnam: require("../assets/images/vietnam.png"),
  nepal: require("../assets/images/nepal.png"),
  uzbek: require("../assets/images/uzbek.png"),
  cambodia: require("../assets/images/cambo.png"),
  etc: require("../assets/images/etc.png"),
};

export function CountryIcon({
  country,
  onSelect,
}: {
  country: string;
  onSelect: (engName: string) => void;
}) {
  let countryImgSrc = images.china;
  let koreanName = "중국";
  let engName = "CHN";

  switch (country) {
    case "china":
      countryImgSrc = images.china;
      koreanName = "중국";
      engName = "CHN";
      break;
    case "vietnam":
      countryImgSrc = images.vietnam;
      koreanName = "베트남";
      engName = "VNM";
      break;
    case "nepal":
      countryImgSrc = images.nepal;
      koreanName = "네팔";
      engName = "NP";
      break;
    case "uzbek":
      countryImgSrc = images.uzbek;
      koreanName = "우즈베크";
      engName = "UZB";
      break;
    case "cambodia":
      countryImgSrc = images.cambodia;
      koreanName = "캄보디아";
      engName = "KHM";
      break;
    case "etc":
      countryImgSrc = images.etc;
      koreanName = "그 외";
      engName = "ETC";
      break;
    default:
      countryImgSrc = images.china;
      koreanName = "중국";
      engName = "CHN";
      break;
  }

  return (
    <TouchableOpacity onPress={() => onSelect(engName)}>
      <View style={styles.iconContainer}>
        <Image
          source={countryImgSrc}
          style={[
            {
              width: 80,
              height: 80,
              borderRadius: 40,
            },
            styles.boxShadow,
          ]}
        />
        <Text style={styles.koreanName}>{koreanName}</Text>
        <Text style={styles.engName}>{engName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
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
