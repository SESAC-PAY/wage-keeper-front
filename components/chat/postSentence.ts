import axios from "axios";
import { client } from "@/shared/remotes/axios";

export const postSentence = async (
  sentence: string,
  workspace: number,
): Promise<boolean> => {
  try {
    await client.post(`/api/message/send`, {
      role: "user",
      content: sentence,
      workspaceId: workspace,
    });
    return true;
  } catch (error) {
    console.error("Error posting sentence", error);
    return false;
  }
};
