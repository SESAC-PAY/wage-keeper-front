import { ChatState } from "@/shared/types/messages";
import { useRecoilValue } from "recoil";
import { chatState } from "@/shared/recoil/messages";

export const isStepDone = (): boolean => {
  const chat = useRecoilValue(chatState);
  const stepKey = `step${chat.step}` as keyof ChatState;

  const sentence = chat[stepKey][chat[stepKey].size - 1];

  if (sentence.includs("좋아요. 다음으로 넘어갑시다.")) return true;

  return false;
};
