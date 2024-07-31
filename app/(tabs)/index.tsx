import { Text, Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userNameContainer}>
          <ThemedText
            style={{
              backgroundColor: "585656",
              fontSize: 18,
            }}
          >
            안녕하세요.
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={{
              backgroundColor: "003863",
              fontSize: 24,
            }}
          >
            외국인 노동자 님
          </ThemedText>
        </View>
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            borderColor: "black",
            borderWidth: 1,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            borderColor: "black",
            borderWidth: 1,
          }}
        />
        <View style={styles.workingInfoContainer}>
          <View
            style={{
              width: 450,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infoTitleContainer}>총근로시간</Text>
            <Text style={styles.infoTitleContainer}>219시간 27분</Text>
          </View>
          <Text style={styles.infoTitleContainer}>지급되어야 하는 금액</Text>
          <Text style={styles.infoTitleContainer}>
            2,300,000W (12031.23wian)
          </Text>
        </View>
      </View>
      <View style={[styles.buttonContainer, styles.boxShadow]}>
        <ThemedText type="title">고용노동부</ThemedText>
        <ThemedText type="subtitle">임금체불, 고민말고 신고하세요.</ThemedText>
        <ThemedText>
          진정서(체불, 직장 내 괴롭힘, 기타 노동법 위반)란,
        </ThemedText>
        <ThemedText>
          임금 체불(급여 미지급), 직장 내 괴롭힘 등 노동관계법 위반 사항에
        </ThemedText>
        <ThemedText>대하여 신고하실 수 있는 민원입니다.</ThemedText>
      </View>
      <View
        style={[
          styles.buttonContainer,
          styles.boxShadow,
          { backgroundColor: "blue", height: 80 },
        ]}
      >
        <ThemedText
          type="title"
          lightColor="light"
          style={{ backgroundColor: "white" }}
        >
          임금체불 진정서 작성하기
        </ThemedText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <View
          style={[
            styles.buttonContainer,
            styles.boxShadow,
            { height: 100, flex: 1 },
          ]}
        >
          <ThemedText
            type="subtitle"
            lightColor="light"
            style={{ backgroundColor: "white" }}
          >
            근로 증빙 자료
          </ThemedText>
        </View>
        <View
          style={[
            styles.buttonContainer,
            styles.boxShadow,
            { height: 100, flex: 1 },
          ]}
        >
          <ThemedText
            type="subtitle"
            lightColor="light"
            style={{ backgroundColor: "white" }}
          >
            고용장 둘러보기
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  userInfoContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userNameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  workingInfoContainer: {
    paddingHorizontal: 20,
    width: 500,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  infoTitleContainer: {
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  boxShadow: {
    shadowColor: "#333333",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  stepContainer: {
    backgroundColor: "green",
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
