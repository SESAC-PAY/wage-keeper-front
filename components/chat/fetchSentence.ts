import axios from "axios";
import { client } from "@/shared/remotes/axios";

export const fetchSentence = async (
  isFirst: boolean,
  step: number,
  workspace: number,
): Promise<string> => {
  try {
    if (step === 5) {
      const response = await client.get(
        `/api/message/stream/${workspace}/${step - 1}/false`,
      );
      const data = response.data;
      return `${data} https://projectpanda.ngrok.io/api/document/${workspace}`;
    } else {
      const response = await client.get(
        `/api/message/stream/${workspace}/${step - 1}/${isFirst}`,
      );
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error("Error fetching sentence", error);
    return "";
  }
};
