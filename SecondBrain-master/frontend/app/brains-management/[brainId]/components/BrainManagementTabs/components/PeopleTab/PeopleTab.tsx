/* eslint-disable max-lines */
"use client";

import { UUID } from "crypto";
import { useTranslation } from "react-i18next";
import { ImUserPlus } from "react-icons/im";
import { MdContentPaste, MdLink } from "react-icons/md";

import { BrainUsers } from "@/lib/components/BrainUsers/BrainUsers";
import { UserToInvite } from "@/lib/components/UserToInvite";
import Button from "@/lib/components/ui/Button";
import { useShareBrain } from "@/lib/hooks/useShareBrain";

type ShareBrainModalProps = {
  brainId: UUID;
};

export const PeopleTab = ({ brainId }: ShareBrainModalProps): JSX.Element => {
  const { t } = useTranslation(["translation","config","brain"]);
  const {
    roleAssignations,
    handleCopyInvitationLink,
    updateRoleAssignation,
    removeRoleAssignation,
    inviteUsers,
    addNewRoleAssignationRole,
    sendingInvitation,
    canAddNewRow,
    hasShareBrainRights,
  } = useShareBrain(brainId, brainId);

  if (!hasShareBrainRights) {
    return (
      <div className="flex items-center justify-center mt-5">
        <div className="relative max-w-md px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
          <strong className="mr-1 font-bold">{t("ohno",{ns:"config"})}</strong>
          <span className="block sm:inline">
            {t("roleRequired",{ns:"config"})}
          </span>
          <p>{t("requireAccess",{ns:"config"})}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void inviteUsers();
        }}
      >
        <div>
          <div className="flex flex-row my-5 align-center">
            <div
              onClick={() => void handleCopyInvitationLink()}
              className="flex flex-row flex-1 p-0 bg-gray-100 border-2 border-gray-200 rounded-md cursor-pointer dark:border-gray-700 justify-space-between align-center"
            >
              <div className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-center transition-opacity bg-transparent border-2 border-t-0 border-b-0 border-l-0 rounded-md rounded-l-none outline-none disabled:opacity-80 focus:ring ring-primary/10 border-gray">
                <MdLink size="20" color="gray" />
              </div>
              <div className="flex flex-row items-center justify-center flex-1">
                <span className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900">
                  {t("shareBrainLink",{ns:"brain"})}
                </span>
              </div>
              <Button type="button">
                <MdContentPaste />
              </Button>
            </div>
          </div>

          <div className="bg-gray-100 h-0.5 my-10 border-gray-200 dark:border-gray-700" />
          <p className="text-lg font-bold">{t("inviteUsers",{ns:"brain"})}</p>

          {roleAssignations.map((roleAssignation, index) => (
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
          </Button>
        </div>

        <div className="flex flex-row justify-end mb-3">
          <Button
            isLoading={sendingInvitation}
            disabled={roleAssignations.length === 0}
            type="submit"
          >
            {t("shareButton",{ns:"translation"})}
          </Button>
        </div>
      </form>
      <div className="bg-gray-100 h-0.5 my-10 border-gray-200 dark:border-gray-700" />
      <p className="text-lg font-bold">{t("usersWithAccess",{ns:"brain"})}</p>
      <BrainUsers brainId={brainId} />
    </>
  );
};
