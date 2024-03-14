import { ChatInput } from "./components";

export const ActionsBar = ({ userId, brainId }: { userId: string, brainId: string }): JSX.Element => {
  return (
    <div className="flex mt-4 flex-row w-full shadow-md dark:shadow-primary/25 hover:shadow-xl transition-shadow rounded-xl bg-white dark:bg-black border border-black/10 dark:border-white/25 p-6">
      <ChatInput
        userId={userId}
        brainId={brainId}
      />
    </div>
  );
};
