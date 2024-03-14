import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useChatContext } from "@/lib/context";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

import { ChatMessage } from "./components/ChatMessage/components/ChatMessage";
import { useChatMessages } from "./hooks/useChatMessages";
import { UIpropertyDefault, UIpropertyProps } from "../../types";

export const ChatMessages = (): JSX.Element => {
  const { history } = useChatContext();
  const { t } = useTranslation(["chat"]);
  const { chatListRef } = useChatMessages();
  const { currentBrain } = useBrainContext();
  const [UI, setUI] = useState<UIpropertyProps>({
    AIBgColor: "#F3E8FF",
    AIFontColor: "#374151",
    AIFontSize: 16,
    UserBgColor: "#F3F4F6",
    UserFontColor: "#374151",
    UserFontSize: 16,
  });

  useEffect(() => {
    if (currentBrain) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-condition
      if (currentBrain.ui_properties !== undefined) {
        if (currentBrain.ui_properties !== "") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setUI(JSON.parse(currentBrain.ui_properties));
        } else {
          setUI(UIpropertyDefault);
        }
      }
    }
  }, [currentBrain]);

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
                  ui={UI}
                />
                <ChatMessage
                  key={`assistant-${message_id}`}
                  speaker={"assistant"}
                  text={assistant}
                  brainName={brain_name}
                  promptName={prompt_title}
                  ui={UI}
                />
              </React.Fragment>
            )
          )}
        </div>
      )}
    </div>
  );
};
