"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidCloudUpload } from "react-icons/bi";

import Button from "@/lib/components/ui/Button";
import { Modal } from "@/lib/components/ui/Modal";

import { Slides } from "./slides";

export const FileUploader = (): JSX.Element => {
  const { t } = useTranslation(["translation", "upload"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        Trigger={
          <Button variant={"secondary"} className="m-auto my-10 w-[20%]">
            <BiSolidCloudUpload className="text-xl h-[50px] w-[50px]" />
          </Button>
        }
        title={t("newBrainTitle", { ns: "brain" })}
        // desc={t("newBrainSubtitle", { ns: "brain" })}
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        CloseTrigger={<div />}
      >
        <Slides setIsModalOpen={setIsModalOpen}/>
      </Modal>
    </>
  );
};
