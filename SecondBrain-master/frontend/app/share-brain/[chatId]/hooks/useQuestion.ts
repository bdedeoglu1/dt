import axios from "axios";
import { useTranslation } from "react-i18next";

// import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";
import { useChatContext } from "@/lib/context/ChatProvider/hooks/useChatContext";
import { useToast } from "@/lib/hooks";

import { ChatHistory, ChatWithSharedBrainQuestion } from "../types";

interface UseChatService {
  addStreamQuestion: (
    chatId: string,
    userId: string,
    brainId: string,
    chatQuestion: ChatWithSharedBrainQuestion
  ) => Promise<void>;
}

export const useQuestion = (): UseChatService => {
  const { updateStreamingHistory } = useChatContext();
  const { t } = useTranslation(["chat"]);
  const { publish } = useToast();

  const handleStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ): Promise<void> => {
    const decoder = new TextDecoder("utf-8");

    const handleStreamRecursively = async () => {
      const { done, value } = await reader.read();

      if (done) {
        return;
      }

      const dataStrings = decoder
        .decode(value)
        .trim()
        .split("data: ")
        .filter(Boolean);
      console.log("data strings", dataStrings)
      dataStrings.forEach((data) => {
        try {
          const parsedData = JSON.parse(data) as ChatHistory;
          console.log("data parsedData", parsedData)
          updateStreamingHistory(parsedData);
        } catch (error) {
          console.error(t("errorParsingData", { ns: "chat" }), error);
        }
      });

      await handleStreamRecursively();
    };

    await handleStreamRecursively();
  };

  const addStreamQuestion = async (
    chatId: string,
    userId: string,
    brainId: string,
    chatQuestion: ChatWithSharedBrainQuestion
  ): Promise<void> => {
    const body = JSON.stringify(chatQuestion);
    console.log("Calling API...");
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/${chatId}/question/stream/share-brain?brain_id=${brainId}&user_id=${userId}`,
        {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
        }
      );

      if (response.body === null) {
        throw new Error(t("resposeBodyNull", { ns: "chat" }));
      }
      console.log("receivedResponse=================================================", response);
      await handleStream(response.body.getReader());
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        publish({
          variant: "danger",
          text: t("tooManyRequests", { ns: "chat" }),
        });
      }

      console.error(t("errorCallingAPI", { ns: "chat" }), error);
    }
  };

  return {
    addStreamQuestion,
  };
};
