import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Text,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  Button,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";

const images = {
  china: require("../../assets/images/china.png"),
  vietnam: require("../../assets/images/vietnam.png"),
  nepal: require("../../assets/images/nepal.png"),
  uzbek: require("../../assets/images/uzbek.png"),
  cambodia: require("../../assets/images/cambo.png"),
  etc: require("../../assets/images/etc.png"),
};

export default function HomeScreen() {
  const { engName } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
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

  return (
    <ScrollView style={[styles.container, { padding: width * 0.1 }]}>
      <View style={styles.userInfoContainer}>
        <Button title="Back" onPress={() => router.push("../index.tsx")} />
        <View style={styles.userNameContainer}>
          <ThemedText
            style={[styles.themedText, { fontSize: normalizeFontSize(16) }]}
          >
            안녕하세요.
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={[styles.themedText, { fontSize: normalizeFontSize(20) }]}
          >
            외국인 노동자 님
          </ThemedText>
        </View>
        <Image
          source={countryImgSrc}
          style={{
            width: width * 0.12,
            height: width * 0.12,
            borderRadius: width * 0.06,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={require("../../assets/images/userImg.png")}
          style={[
            styles.userImageLarge,
            {
              width: width * 0.2,
              height: width * 0.2,
              borderRadius: width * 0.1,
            },
          ]}
        />
        <View style={styles.workingInfoContainer}>
          <View style={styles.workingInfoRow}>
            <Text
              style={[styles.infoTitle, { fontSize: normalizeFontSize(16) }]}
            >
              총근로시간
            </Text>
            <Text
              style={[styles.infoTitle, { fontSize: normalizeFontSize(16) }]}
            >
              219시간 27분
            </Text>
          </View>
          <Text style={[styles.infoTitle, { fontSize: normalizeFontSize(16) }]}>
            지급되어야 하는 금액
          </Text>
          <Text style={[styles.infoTitle, { fontSize: normalizeFontSize(16) }]}>
            2,300,000W (12031.23wian)
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ThemedText type="title" style={{ fontSize: normalizeFontSize(20) }}>
          고용노동부
        </ThemedText>
        <ThemedText type="subtitle" style={{ fontSize: normalizeFontSize(16) }}>
          임금체불, 고민말고 신고하세요.
        </ThemedText>
        <ThemedText style={{ fontSize: normalizeFontSize(14) }}>
          진정서(체불, 직장 내 괴롭힘, 기타 노동법 위반)란,
        </ThemedText>
        <ThemedText style={{ fontSize: normalizeFontSize(14) }}>
          임금 체불(급여 미지급), 직장 내 괴롭힘 등 노동관계법 위반 사항에
        </ThemedText>
        <ThemedText style={{ fontSize: normalizeFontSize(14) }}>
          대하여 신고하실 수 있는 민원입니다.
        </ThemedText>
      </View>
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: "blue", height: width * 0.2 },
        ]}
      >
        <ThemedText
          type="title"
          lightColor="light"
          style={{ backgroundColor: "white", fontSize: normalizeFontSize(20) }}
        >
          임금체불 진정서 작성하기
        </ThemedText>
      </View>
      <View style={styles.buttonRow}>
        <View style={styles.flexButtonContainer}>
          <ThemedText
            type="subtitle"
            lightColor="light"
            style={{
              backgroundColor: "white",
              fontSize: normalizeFontSize(16),
            }}
          >
            근로 증빙 자료
          </ThemedText>
        </View>
        <View style={styles.flexButtonContainer}>
          <ThemedText
            type="subtitle"
            lightColor="light"
            style={{
              backgroundColor: "white",
              fontSize: normalizeFontSize(16),
            }}
          >
            고용장 둘러보기
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userNameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  themedText: {
    backgroundColor: "585656",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  userImageLarge: {
    borderColor: "black",
  },
  workingInfoContainer: {
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  workingInfoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "1D3560",
  },
  buttonContainer: {
    padding: 14,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    gap: 5,
    marginVertical: 20,
    shadowColor: "#333333",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  flexButtonContainer: {
    height: 100,
    flex: 1,
    padding: 14,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#333333",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
