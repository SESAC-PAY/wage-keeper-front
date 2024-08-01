import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WageKeeperIcon } from "@/components/WageKeeperIcon";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const navigation = useNavigation();

  const onClickMic = () => {
    alert("마이크 누름!");
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setLoading(true);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: "가짜 응답", sender: "bot" },
        ]);
        setLoading(false);

        if (step < 3) {
          setStep((prevStep) => prevStep + 1);
        }
      }, 2000);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Step ${step}`,
      headerTitleAlign: "center",
    });
  }, [step, navigation]);

  const getContainerStyle = (containerStep: number) => {
    return {
      backgroundColor: step === containerStep ? "#E7EFF6" : "#FAFAFA",
      borderRadius: 20,
      paddingHorizontal: 20,
      marginVertical: 5,
      paddingVertical: 10,
      alignItems: "center",
    };
  };

  const getTextStyle = (containerStep: number) => {
    return {
      color: step === containerStep ? "#4894FE" : "#8696BB",
      fontSize: 16,
      fontWeight: "bold",
    };
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.stepContainer}>
        <View style={getContainerStyle(1)}>
          <Text style={getTextStyle(1)}>고용주 정보</Text>
        </View>
        <View style={getContainerStyle(2)}>
          <Text style={getTextStyle(2)}>피해 사실</Text>
        </View>
        <View style={getContainerStyle(3)}>
          <Text style={getTextStyle(3)}>정보 등록</Text>
        </View>
      </View>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {messages.map((message, index) => (
          <View key={message.id}>
            {(index % 2 === 0 || message.sender === "bot") && (
              <WageKeeperIcon />
            )}
            <View
              style={[
                styles.messageContainer,
                message.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
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
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
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
    // minHeight: 40,
    // maxHeight: 100,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    flexWrap: "wrap",
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
