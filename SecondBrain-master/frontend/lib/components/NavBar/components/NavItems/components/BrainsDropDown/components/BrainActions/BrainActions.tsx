import { ShareBrain } from "@/lib/components/ShareBrain";
import { MinimalBrainForUser } from "@/lib/context/BrainProvider/types";

import { DeleteBrain } from "./components";
import { BrainRoleType } from "./types";

type BrainActionsProps = {
  brain: MinimalBrainForUser;
  userId: string;
};

const requiredAccessToShareBrain: BrainRoleType[] = ["Owner", "Editor"];

export const BrainActions = ({ brain, userId }: BrainActionsProps): JSX.Element => {
  return (
    <div className="absolute right-0 flex flex-row">
      {requiredAccessToShareBrain.includes(brain.role) && (
        <ShareBrain brainId={brain.id} name={brain.name} userId={userId} />
      )}
      <DeleteBrain brainId={brain.id} />
    </div>
  );
};
