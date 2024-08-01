import axios from "axios";
import { Message, ChatState } from "@/shared/types/messages";
import { useRecoilState } from "recoil";
import { chatState } from "@/shared/recoil/messages";

export const fetchSentence = async (isFirst: boolean, step: number) => {
  const [chat, setChat] = useRecoilState(chatState);

  try {
    if (isFirst) {
      const response = await axios.post(`/api/message/stream/${step - 1}/true`);
      const data = response.data;

      const newMessage: Message = {
        id: Date.now(),
        text: data.content,
        sender: "bot",
      };

      setChat((prevChat: ChatState) => {
        const updatedChat: ChatState = { ...prevChat };
        const stepKey = `step${step}` as keyof ChatState;
        (updatedChat[stepKey] as Message[]).push(newMessage);
        return updatedChat;
      });
    } else {
      const response = await axios.post(
        `/api/message/stream/${step - 1}/false`,
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
        (updatedChat[stepKey] as Message[]).push(newMessage);
        return updatedChat;
      });
    }
  } catch (error) {
    console.error("Error fetching First Sentence!!!", error);
    return null;
  }
};
