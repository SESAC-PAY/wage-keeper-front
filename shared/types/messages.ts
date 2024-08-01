// src/shared/types/messages.ts
export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export interface ChatState {
  workspace: number;
  step: number;
  step1: Message[];
  step2: Message[];
  step3: Message[];
  step4: Message[];
  step5: Message[];
  [key: string]: any;
}
