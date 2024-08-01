import { atom } from "recoil";
import { ChatState } from "@/shared/types/messages";

export const chatState = atom<ChatState>({
  key: "chatState",
  default: {
    workspace: -1,
    step: 1,
    chats: [],
  },
});
