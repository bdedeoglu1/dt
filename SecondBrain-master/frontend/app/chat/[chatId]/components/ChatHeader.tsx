import { useTranslation } from "react-i18next";

import { ShareBrainInChatPage } from "@/lib/components/ShareBrain";
import { useChatContext } from "@/lib/context";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

import { CustomizeButton } from "./CustomizeButton";

export const ChatHeader = (): JSX.Element => {
  const { t } = useTranslation(["chat"]);
  const { history } = useChatContext();
  const { userId, currentBrain } = useBrainContext();

  const renderContent = () => (
    <div className="relative flex items-center justify-center w-full">
      <h1 className="text-3xl font-bold text-center">
        Chat with your Digital Twin -{" "}
        <span className="text-purple-500">{currentBrain?.name ?? ""}</span>
        <br />
        {t("empty_brain_title_prefix")}{" "}
        <span className="text-purple-500">{t("brain")}</span>{" "}
        {t("empty_brain_title_suffix")}
      </h1>
      <div className="absolute right-0 flex items-center justify-between">
        <ShareBrainInChatPage
          brainId={currentBrain?.id ?? "00-00-00-00-00"}
          name={currentBrain?.name ?? ""}
          userId={userId}
        />
        <CustomizeButton brainId={currentBrain?.id ?? "00-00-00-00-00"} />
      </div>
    </div>
  );

  if (history.length !== 0) {
    return (
      <div className="relative flex items-center justify-center w-full">
        <h1 className="text-3xl font-bold text-center">
          Chat with your Digital Twin -{" "}
          <span className="text-purple-500">{currentBrain?.name ?? ""}</span>
        </h1>
        <div className="absolute right-0 flex items-center justify-between">
          <ShareBrainInChatPage
            brainId={currentBrain?.id ?? "00-00-00-00-00"}
            name={currentBrain?.name ?? ""}
            userId={userId}
          />
          <CustomizeButton brainId={currentBrain?.id ?? "00-00-00-00-00"} />
        </div>
      </div>
    );
  }

  return renderContent();
};
