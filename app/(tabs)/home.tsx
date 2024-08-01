import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";

const images = {
  china: require("../../assets/images/china.png"),
  vietnam: require("../../assets/images/vietnam.png"),
  nepal: require("../../assets/images/nepal.png"),
  uzbek: require("../../assets/images/uzbek.png"),
  cambodia: require("../../assets/images/cambo.png"),
  etc: require("../../assets/images/etc.png"),
  main: require("../../assets/images/main.png"),
  chatbutton: require("../../assets/images/chatbutton.png"),
  workbutton: require("../../assets/images/workbutton.png"),
  reviewbutton: require("../../assets/images/reviewbutton.png"),
};

export default function HomeScreen() {
  const { engName } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const router = useRouter();

  let countryImgSrc = images.china;

  const baseWidth = 375;
  const scale = width / baseWidth;

  switch (engName) {
    case "CHN":
      countryImgSrc = images.china;
      break;
    case "VNM":
      countryImgSrc = images.vietnam;
      break;
    case "NP":
      countryImgSrc = images.nepal;
      break;
    case "UZB":
      countryImgSrc = images.uzbek;
      break;
    case "KHM":
      countryImgSrc = images.cambodia;
      break;
    case "ETC":
      countryImgSrc = images.etc;
      break;
    default:
      countryImgSrc = images.china;
      break;
  }

  const normalizeFontSize = (size: number) => Math.round(size * scale);

  const onSelectChatting = () => {
    router.push("../chat/chat");
  };

  const onSelectCalendar = () => {
    router.push("/calendar");
  };

  const onSelectExplore = () => {
    router.push("/explore");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/main.png")}
          style={styles.userImageLarge}
        />
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.chatButtonContainer} onPress={onSelectChatting}>
          <Image
            source={require("../../assets/images/chatbutton.png")}
            style={styles.ImageButton}
          />
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onSelectCalendar} style={styles.buttonWrapper}>
            <Image
              source={require("../../assets/images/workbutton.png")}
              style={styles.ImageButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelectExplore} style={styles.buttonWrapper}>
            <Image
              source={require("../../assets/images/reviewbutton.png")}
              style={styles.ImageButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
  },
  userImageLarge: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  contentContainer: {
    backgroundColor: "#F5F5F9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -98,
    alignItems: "center",
    paddingHorizontal: 20, // Add horizontal padding to the content container
  },
  chatButtonContainer: {
    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Ensure the buttons take full width minus padding
    // Add horizontal padding to ensure proper alignment
  },
  buttonWrapper: {
    width: "49%", // Adjust the width to be slightly less than 50% to provide spacing
    alignItems: "center",
   // Adjust vertical space between buttons
  },
  ImageButton: {
    width: "100%", // Full width to fill the buttonWrapper
    height: undefined,
    aspectRatio: 1, // Maintain aspect ratio
    resizeMode: "contain",
  },
});
