"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";

import Button from "./Button";

type CommonModalProps = {
  title?: string;
  desc?: string;
  children?: ReactNode;
  Trigger: ReactNode;
  CloseTrigger?: ReactNode;
  isOpen?: undefined;
  setOpen?: undefined;
};

type ModalProps =
  | CommonModalProps
  | (Omit<CommonModalProps, "isOpen" | "setOpen"> & {
      isOpen: boolean;
      setOpen: (isOpen: boolean) => void;
    });

export const Modal = ({
  title,
  desc,
  children,
  Trigger,
  CloseTrigger,
  isOpen: customIsOpen,
  setOpen: customSetOpen,
}: ModalProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation(["translation"]);

  return (
    <Dialog.Root onOpenChange={customSetOpen ?? setOpen}>
      <Dialog.Trigger asChild>{Trigger}</Dialog.Trigger>
      <AnimatePresence>
        {customIsOpen ?? isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                // className="fixed inset-0 z-50 flex justify-center py-20 overflow-auto cursor-pointer md:z-40 bg-black/50 backdrop-blur-sm"
                className="fixed inset-0 z-50 flex justify-center py-25 overflow-auto cursor-pointer md:z-40 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Dialog.Content asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0, y: "-40%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "40%" }}
                    className="w-[90vw] my-auto flex flex-col h-fit max-w-2xl rounded-xl bg-white dark:bg-black border border-black/10 dark:border-white/25 p-10 shadow-xl dark:shadow-primary/50 focus:outline-none cursor-auto"
                    
                  >
                    <Dialog.Title
                      className="m-0 text-2xl font-bold border-b border-grey pb-3"
                      data-testid="modal-title"
                    >
                      {title}
                    </Dialog.Title>
                    <Dialog.Description
                      className="opacity-50 py-3"
                      data-testid="modal-description"
                    >
                      {desc}
                    </Dialog.Description>
                    {children}
                    <Dialog.Close asChild>
                      {CloseTrigger !== undefined ? (
                        CloseTrigger
                      ) : (
                        <Button variant={"secondary"} className="self-end">
                          {t("doneButton")}
                        </Button>
                      )}
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <button
                        className="absolute top-0 right-0 inline-flex items-center justify-center p-5 rounded-full appearance-none focus:shadow-sm focus:outline-none"
                        aria-label="Close"
                      >
                        <MdClose />
                      </button>
                    </Dialog.Close>
                  </motion.div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};
