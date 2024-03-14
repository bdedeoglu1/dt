import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { UIpropertyProps } from "@/app/chat/[chatId]/types";
import { useChatContext } from "@/lib/context";
import { useFetch } from "@/lib/hooks";

import { ChatMessage } from "./components/ChatMessage/components/ChatMessage";
import { useChatMessages } from "./hooks/useChatMessages";

export const ChatMessages = (): JSX.Element => {
  const { history } = useChatContext();
  const { t } = useTranslation(["chat"]);
  const { chatListRef } = useChatMessages();

  const { fetchInstance } = useFetch();
  const [UI, setUI] = useState<UIpropertyProps>({
    AIBgColor: "#F3E8FF",
    AIFontColor: "#374151",
    AIFontSize: 12,
    UserBgColor: "#F3F4F6",
    UserFontColor: "#374151",
    UserFontSize: 12,
  });
  const searchParams = useSearchParams();

  const brainId = searchParams?.get("brainId") ?? "";
  const backendAPI = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await fetchInstance.get(
          `${backendAPI}/brains/ui-properties/${brainId}/`
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        const responseData: any = await response.json();
        if ("prompt" in responseData) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
          setUI(JSON.parse(responseData.prompt));
        }
      } catch (error) {
        console.log(error);
      }
    };
    void fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1, // Allow the component to grow within its flex container
        overflowY: "auto", // Enable vertical scrolling when content overflows
      }}
      ref={chatListRef}
    >
      {history.length === 0 ? (
        <div
          data-testid="empty-history-message"
          className="text-center opacity-50"
        >
          {t("ask", { ns: "chat" })}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map(
            ({
              assistant,
              message_id,
              user_message,
              brain_name,
              prompt_title,
            }) => (
              <React.Fragment key={message_id}>
                <ChatMessage
                  key={`user-${message_id}`}
                  speaker={"user"}
                  text={user_message}
                  promptName={prompt_title}
                  brainName={brain_name}
                  UI={UI}
                />
                <ChatMessage
                  key={`assistant-${message_id}`}
                  speaker={"assistant"}
                  text={assistant}
                  brainName={brain_name}
                  promptName={prompt_title}
                  UI={UI}
                />
              </React.Fragment>
            )
          )}
        </div>
      )}
    </div>
  );
};
