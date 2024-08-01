import axios from "axios";
import { Message, ChatState } from "@/shared/types/messages";
import { client } from "@/shared/remotes/axios";

export const fetchSentence = async (
  isFirst: boolean,
  step: number,
  setChat: (update: (prevChat: ChatState) => ChatState) => void,
  chat: ChatState,
) => {
  try {
    alert(`${chat.workspace}`);
    const response = await client.get(
      `/api/message/stream/${chat.workspace}/${step - 1}/${isFirst}`,
    );
    const data = response.data;

    const newMessage: Message = {
      id: Date.now(),
      text: data.content,
      sender: "bot",
    };

    setChat((prevChat: ChatState) => {
      const updatedChat: ChatState = { ...prevChat };
      const stepKey = `step${step}` as keyof ChatState;

      if (!Array.isArray(updatedChat[stepKey])) {
        updatedChat[stepKey] = [] as Message[];
      }

      (updatedChat[stepKey] as Message[]).push(newMessage);
      return updatedChat;
    });
  } catch (error) {
    console.error("Error fetching sentence", error);
    return null;
  }
};
