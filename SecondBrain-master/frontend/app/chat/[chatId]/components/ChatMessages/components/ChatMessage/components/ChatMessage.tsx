import { useFeature } from "@growthbook/growthbook-react";
import React from "react";
// import ReactMarkdown from "react-markdown";

import { UIpropertyProps } from "@/app/chat/[chatId]/types";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  speaker: string;
  text: string;
  brainName?: string;
  promptName?: string;
  ui: UIpropertyProps;
};

export const ChatMessage = React.forwardRef(
  (
    { speaker, text, brainName, promptName, ui }: ChatMessageProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const isNewUxOn = useFeature("new-ux").on;

    const isUserSpeaker = speaker === "user";
    const containerClasses = cn(
      "py-3 px-5 w-fit ",
      isUserSpeaker
        ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `bg-opacity-60 items-start`
        : "bg-opacity-60 items-end",
      "dark:bg-gray-800 rounded-3xl flex flex-col overflow-hidden scroll-pb-32"
    );

    const containerWrapperClasses = cn(
      "flex flex-col",

      isUserSpeaker ? "items-end" : "items-start"
    );

    // const markdownClasses = cn(`prose text-[${isUserSpeaker? ui.UserFontSize : ui.AIFontSize}px]`, "dark:prose-invert");

    return (
      <div className={containerWrapperClasses}>
        {" "}
        <div
          ref={ref}
          style={{
            backgroundColor: isUserSpeaker ? ui.UserBgColor : ui.AIBgColor,
            color: isUserSpeaker ? ui.UserFontColor : ui.AIFontColor,
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
            <p style={{ fontSize: isUserSpeaker ? ui.UserFontSize : ui.AIFontSize }}>{text}</p>
          </div>
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";
