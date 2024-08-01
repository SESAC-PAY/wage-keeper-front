import { atom } from "recoil";
import { ChatState } from "@/shared/types/messages";

export const chatState = atom<ChatState>({
  key: "chatState",
  default: {
    workspace: -1,
    step: 1,
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
  },
});
