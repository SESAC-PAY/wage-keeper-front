import { fetchSentence } from "@/components/chat/fetchSentence";

export const isStepDone = async (sentence: string): Promise<boolean> => {
  return sentence.includes("좋아요. 다음으로 넘어갑시다.");
};
