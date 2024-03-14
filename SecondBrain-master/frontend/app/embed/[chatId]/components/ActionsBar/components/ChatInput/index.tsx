"use client";
import { useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";

import Button from "@/lib/components/ui/Button";

import { ChatBar } from "./components/ChatBar/ChatBar";
import { MicButton } from "./components/MicButton/MicButton";
import { useChatInput } from "./hooks/useChatInput";

export const ChatInput = ({
  userId,
  brainId,
}: {
  userId: string;
  brainId: string;
}): JSX.Element => {
  const {
    setMessage,
    setUserId,
    setBrainId,
    submitQuestion,
    generatingAnswer,
    message,
  } = useChatInput();

  useEffect(() => {
    setUserId(userId);
    setBrainId(brainId);
  }, []);

  return (
    <form
      data-testid="chat-input-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitQuestion();
      }}
      className="sticky flex items-star bottom-0 bg-white dark:bg-black w-full justify-center gap-2 z-20"
    >
      <div className="flex flex-1 flex-row items-center">
        <ChatBar
          message={message}
          setMessage={setMessage}
          onSubmit={submitQuestion}
        />
      </div>

      <div className="flex justify-center items-center">
        <Button
          className="p-1 sm:px-1 sm:py-1"
          type="submit"
          isLoading={generatingAnswer}
          data-testid="submit-button"
        >
          {generatingAnswer ? <></> : <BsFillSendFill />}
        </Button>
        <div className="flex items-center">
          <MicButton setMessage={setMessage} />
        </div>
      </div>
    </form>
  );
};
