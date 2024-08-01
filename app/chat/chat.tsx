import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WageKeeperIcon } from "@/components/WageKeeperIcon";
import { fetchSentence } from "@/components/chat/fetchSentence";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { chatState } from "@/shared/recoil/messages";
import { fetchWorkspace } from "@/components/chat/fetchWorkspace";
import { postSentence } from "@/components/chat/postSentence";

export const isStepDone = (sentence: string): boolean => {
  return sentence.includes("좋아요. 다음으로 넘어갑시다.");
};

export default function ChatScreen() {
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [chat, setChat] = useRecoilState(chatState);
  const resetChat = useResetRecoilState(chatState);
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const stepScrollViewRef = useRef<ScrollView>(null);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: `진정서 작성을 도와드릴게요!`,
      headerTitleAlign: "center",
    });

    const initFetch = async () => {
      setLoading(true);
      await fetchWorkspace(setChat);
      const sentence = await fetchSentence(isFirst, 1, chat.workspace);
      setMessages((prevMessages) => [...prevMessages, sentence]);
      setIsFirst(false);
      setLoading(false);
    };

    initFetch();

    return () => {
      setChat((prev) => ({
        ...prev,
        step: 1,
      }));
    };
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    if (stepScrollViewRef.current) {
      stepScrollViewRef.current.scrollTo({
        x: (chat.step - 1) * 100,
        animated: true,
      });
    }
  }, [chat.step]);

  const onClickMic = () => {
    alert("마이크 누름!");
  };

  const onClickGallery = () => {
    alert("갤러리 누름!");
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = inputText;
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText("");
      setLoading(true);

      await postSentence(userMessage, chat.workspace);

      let sentence = await fetchSentence(isFirst, chat.step, chat.workspace);
      let updatedMessages = [...messages, userMessage, sentence];

      if (isStepDone(sentence)) {
        setChat((prevChat) => ({
          ...prevChat,
          step: prevChat.step + 1,
        }));
        const nextSentence = await fetchSentence(
          true,
          chat.step,
          chat.workspace,
        );
        updatedMessages[updatedMessages.length - 1] += ` ${nextSentence}`;
      } else {
        setIsFirst(false);
      }

      setMessages(updatedMessages);
      setLoading(false);
    }
  };

  const getContainerStyle = (containerStep: number) => {
    return [
      styles.containerStep,
      {
        backgroundColor: chat.step === containerStep ? "#E7EFF6" : "#FAFAFA",
      },
    ];
  };

  const getTextStyle = (containerStep: number) => {
    return [
      styles.textStep,
      {
        color: chat.step === containerStep ? "#4894FE" : "#8696BB",
      },
    ];
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80} // Adjust this value as needed
    >
      <ScrollView
        horizontal
        style={styles.stepScrollView}
        contentContainerStyle={styles.stepContainer}
        ref={stepScrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        <View style={getContainerStyle(1)}>
          <Text style={getTextStyle(1)}>피해 사실</Text>
        </View>
        <View style={getContainerStyle(2)}>
          <Text style={getTextStyle(2)}>증거 자료</Text>
        </View>
        <View style={getContainerStyle(3)}>
          <Text style={getTextStyle(3)}>등록인 정보</Text>
        </View>
        <View style={getContainerStyle(4)}>
          <Text style={getTextStyle(4)}>고용주 정보</Text>
        </View>
        <View style={getContainerStyle(5)}>
          <Text style={getTextStyle(5)}>완료</Text>
        </View>
      </ScrollView>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 60 }}
        ref={scrollViewRef}
      >
        {messages.map((message, index) => (
          <View key={index}>
            {index % 2 === 0 && <WageKeeperIcon />}
            <View
              style={[
                styles.messageContainer,
                index % 2 === 1 ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{message}</Text>
            </View>
          </View>
        ))}
        {loading && (
          <View>
            <WageKeeperIcon />
            <View style={[styles.messageContainer, styles.botMessage]}>
              <Text style={styles.messageText}>...</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onClickMic}>
          <Ionicons
            name="mic"
            size={24}
            style={{ paddingHorizontal: 5, color: "#8696BB" }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="무엇이든 물어보세요!"
          placeholderTextColor="#8696BB"
          multiline
        />
        <TouchableOpacity onPress={onClickGallery}>
          <AntDesign
            name="upload"
            size={24}
            style={{ paddingHorizontal: 5, color: "#8696BB" }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepScrollView: {
    flexGrow: 0,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  containerStep: {
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  textStep: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderBottomRightRadius: 0,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5F2FE",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    flexWrap: "wrap",
    marginHorizontal: 5,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
