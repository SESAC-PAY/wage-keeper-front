import axios from "axios";
import { ChatState } from "@/shared/types/messages";
import { client } from "@/shared/remotes/axios";

export const fetchWorkspace = async (
  setChat: (update: (prevChat: ChatState) => ChatState) => void,
) => {
  try {
    const userId = 1;

    const response = await client.post(`/api/workspace/generation/${userId}`);
    const data = response.data.data;

    setChat((prevChat: ChatState) => {
      const updatedChat: ChatState = { ...prevChat };
      updatedChat["workspace"] = data;
      return updatedChat;
    });

    return true;
  } catch (error) {
    alert("에러 왔따잉!");
    console.error("Error fetching workspace ID", error);
    return false;
  }
};
