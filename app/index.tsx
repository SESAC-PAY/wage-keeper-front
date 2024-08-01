import React, { useState } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CountryIcon } from "@/components/CountryIcon";
import { useRouter } from "expo-router";

// 사용하려는 국가 목록
const countries = ["china", "vietnam", "nepal", "uzbek", "cambodia", "etc"];

export default function CountryScreen() {
  const { width } = useWindowDimensions();
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();

  const normalizeFontSize = (size: number) => Math.round(size * (width / 375));

  const handleSelectCountry = (engName: string) => {
    setSelectedCountry(engName);
    router.replace({
      pathname: "../(tabs)/home",
      params: { engName },
    });
  };

  return (
    <ScrollView style={[styles.container, { padding: width * 0.05 }]}>
      <View style={styles.userNameContainer}>
        <ThemedText
          type="subtitle"
          style={{ fontSize: normalizeFontSize(12), color: "#585656" }}
        >
          안녕하세요,
        </ThemedText>
        <ThemedText type="title" style={{ fontSize: normalizeFontSize(22) }}>
          새싹 님
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={{
            color: "#3D6084",
            fontSize: normalizeFontSize(18),
            marginTop: 40,
          }}
        >
          출신 나라를 선택해주세요!
        </ThemedText>
      </View>
      <FlatList
        data={countries}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <CountryIcon country={item} onSelect={handleSelectCountry} />
          </View>
        )}
        contentContainerStyle={styles.imagesContainer}
      />
      {selectedCountry && (
        <View style={styles.selectedCountryContainer}>
          <ThemedText
            type="subtitle"
            style={{ fontSize: normalizeFontSize(16) }}
          >
            선택한 나라: {selectedCountry}
          </ThemedText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  userNameContainer: {
    marginBottom: 60,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
  imagesContainer: {
    justifyContent: "center",
    gap: 20,
  },
  selectedCountryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
