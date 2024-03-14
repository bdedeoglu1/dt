/* eslint-disable max-lines */
"use client";

import copy from "copy-to-clipboard";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { ImUserPlus } from "react-icons/im";
import { MdContentCopy, MdContentPaste } from "react-icons/md";

// import { BrainUsers } from "@/lib/components/BrainUsers/BrainUsers";
// import { UserToInvite } from "@/lib/components/UserToInvite";
import Button from "@/lib/components/ui/Button";
import { Modal } from "@/lib/components/ui/Modal";
import { useToast } from "@/lib/hooks";
import { useShareBrain } from "@/lib/hooks/useShareBrain";

type ShareBrainModalProps = {
  brainId: UUID;
  name: string;
  userId: string;
};

type copyType = {
  share: boolean;
  embed: boolean;
};

export const ShareBrainInChatPage = ({
  brainId,
  name,
  userId,
}: ShareBrainModalProps): JSX.Element => {
  const { brainShareLink, embedLink, setIsShareModalOpen, isShareModalOpen } =
    useShareBrain(brainId, userId);
  const { publish } = useToast();
  const { t } = useTranslation(["translation", "brain"]);
  const [isCopied, setIsCopied] = useState<copyType>({
    share: false,
    embed: false,
  });

  const handleCopyShareLink = (link: string) => {
    // writeText function to copy or write data to clipboard
    if (link === "share") {
      copy(brainShareLink);
      setIsCopied({
        ...isCopied,
        share: true,
      });
    } else {
      copy(embedLink);
      setIsCopied({
        ...isCopied,
        embed: true,
      });
    }
    publish({
      text: "Copied to clipboard",
      variant: "success",
    });
  };

  useEffect(() => {
    setIsCopied({
      share: false,
      embed: false
    });
  }, [isShareModalOpen]);

  return (
    <Modal
      Trigger={
        <Button
          className="gap-x-10 group-hover:visible hover:text-red-500 transition-[colors,opacity] p-1"
          onClick={() => void 0}
          variant={"tertiary"}
          data-testId="share-brain-button"
        >
          {/* <MdShare className="w-20 h-20 text-xl " /> */}
          <p className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white transition-colors bg-black border border-black rounded-md outline-none disabled:opacity-80 focus:ring ring-primary/10 dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 sm:px-4 sm:py-2">
            Share
          </p>
        </Button>
      }
      CloseTrigger={<div />}
      title={t("shareBrain", { name, ns: "brain" })}
      isOpen={isShareModalOpen}
      setOpen={setIsShareModalOpen}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // void inviteUsers();
        }}
      >
        <div>
          <div className="flex flex-row my-5 align-center">
            <div className="flex flex-row flex-1 p-3 bg-gray-100 border-b border-gray-200 rounded dark:border-gray-700 justify-space-between align-center">
              <div className="flex flex-1 overflow-hidden">
                <p className="flex-1 color-gray-500">{brainShareLink}</p>
              </div>
              <Button
                type="button"
                onClick={() => handleCopyShareLink("share")}
              >
                {isCopied.share ? <MdContentPaste /> : <MdContentCopy />}
              </Button>
            </div>
          </div>
          <p className="pb-[25px]">
            Please share this link with others so that they can also use this
            brain!
          </p>
          <div className="bg-gray-100 h-0.5 mb-5 border-gray-200 dark:border-gray-700" />
        </div>

        <div>
          <div className="flex flex-row my-5 align-center">
            <div className="flex flex-row flex-1 p-3 bg-gray-100 border-b border-gray-200 rounded dark:border-gray-700 justify-space-between align-center">
              <div className="flex flex-1 overflow-hidden">
                <p className="flex-1 color-gray-500">{embedLink}</p>
              </div>
              <Button
                type="button"
                onClick={() => handleCopyShareLink("embed")}
              >
                {isCopied.embed ? <MdContentPaste /> : <MdContentCopy />}
              </Button>
            </div>
          </div>
          <p className="pb-[25px]">
            Please embed this link so that you can also use this on your own
            websites!
          </p>
          <div className="bg-gray-100 h-0.5 mb-5 border-gray-200 dark:border-gray-700" />

          {/* {roleAssignations.map((roleAssignation, index) => (
            <UserToInvite
              key={roleAssignation.id}
              onChange={updateRoleAssignation(index)}
              removeCurrentInvitation={removeRoleAssignation(index)}
              roleAssignation={roleAssignation}
            />
          ))}
          <Button
            className="my-5"
            onClick={addNewRoleAssignationRole}
            disabled={sendingInvitation || !canAddNewRow}
            data-testid="add-new-row-role-button"
          >
            <ImUserPlus />
          </Button> */}
        </div>

        <div className="flex flex-row justify-end mb-3">
          <Button
            // isLoading={sendingInvitation}
            // disabled={roleAssignations.length === 0}
            onClick={() => setIsShareModalOpen(false)}
            type="button"
          >
            OK
          </Button>
        </div>
      </form>
      {/* <div className="bg-gray-100 h-0.5 mb-5 border-gray-200 dark:border-gray-700" />
      <p className="text-lg font-bold">
        {t("shareBrainUsers", { ns: "brain" })}
      </p>
      <BrainUsers brainId={brainId} /> */}
    </Modal>
  );
};
