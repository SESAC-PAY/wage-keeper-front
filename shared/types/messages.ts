// src/shared/types/messages.ts
export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export interface ChatState {
  workspace: number;
  step: number;
  chats: Message[];
  [key: string]: any;
}
