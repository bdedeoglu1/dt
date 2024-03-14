import { useChatContext } from "@/lib/context";

export const ChatHeader = ({ brainName } : { brainName: string }): JSX.Element => {
  const { history } = useChatContext();

  if (history.length !== 0) {
    return (
      <h1 className="text-3xl font-bold text-center">
        Chat with <span className="text-purple-500">{brainName}</span> Digital Twin
      </h1>
    );
  }

  return (
    <h1 className="text-3xl font-bold text-center">
      Chat with <span className="text-purple-500">{brainName}</span> Digital Twin
    </h1>
  );
};
