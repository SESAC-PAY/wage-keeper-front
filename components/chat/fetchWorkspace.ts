import axios from "axios";
import { ChatState } from "@/shared/types/messages";

export const fetchWorkspace = async (
  setChat: (update: (prevChat: ChatState) => ChatState) => void,
) => {
  try {
    const userId = 1;
    const response = await axios.post(`/api/workspace/generatino/${userId}`);
    const data = response.data.data;

    setChat((prevChat: ChatState) => {
      const updatedChat: ChatState = { ...prevChat, workspace: data };
      return updatedChat;
    });
  } catch (error) {
    console.error("Error fetching workspace ID", error);
    return null;
  }
};
