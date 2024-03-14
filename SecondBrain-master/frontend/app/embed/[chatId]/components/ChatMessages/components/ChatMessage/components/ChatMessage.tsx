import { useFeature } from "@growthbook/growthbook-react";
import React from "react";

import { UIpropertyProps } from "@/app/chat/[chatId]/types";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  speaker: string;
  text: string;
  brainName?: string;
  promptName?: string;
  UI: UIpropertyProps;
};

export const ChatMessage = React.forwardRef(
  (
    { speaker, text, brainName, promptName, UI }: ChatMessageProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const isNewUxOn = useFeature("new-ux").on;

    const isUserSpeaker = speaker === "user";
    const containerClasses = cn(
      "py-3 px-5 w-fit ",
      isUserSpeaker ? "bg-opacity-60 items-start " : "bg-opacity-60 items-end",
      "dark:bg-gray-800 rounded-3xl flex flex-col overflow-hidden scroll-pb-32"
    );

    const containerWrapperClasses = cn(
      "flex flex-col",

      isUserSpeaker ? "items-end" : "items-start"
    );

    return (
      <div className={containerWrapperClasses}>
        {" "}
        <div
          ref={ref}
          style={{
            backgroundColor: isUserSpeaker ? UI.UserBgColor : UI.AIBgColor,
            color: isUserSpeaker ? UI.UserFontColor : UI.AIFontColor,
          }}
          className={containerClasses}
        >
          {isNewUxOn && (
            <span
              data-testid="brain-prompt-tags"
              className="text-gray-400 mb-1"
            >
              @{brainName ?? "-"} #{promptName ?? "-"}
            </span>
          )}
          <div data-testid="chat-message-text">
            {/* <ReactMarkdown className={markdownClasses}>{text}</ReactMarkdown> */}
            <p
              style={{
                fontSize: isUserSpeaker ? UI.UserFontSize : UI.AIFontSize,
              }}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";
