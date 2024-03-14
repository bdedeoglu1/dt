import { ChangeEvent, useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BsChevronLeft,
  BsChevronRight,
  BsFillSendFill,
  BsMagic,
} from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

import Button from "@/lib/components/ui/Button";
import ColorPicker from "@/lib/components/ui/ColorPicker";
import Field from "@/lib/components/ui/Field";
import { Modal } from "@/lib/components/ui/Modal";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";
import { useFetch } from "@/lib/hooks";

import { UIpropertyDefault, UIpropertyProps } from "../types";

export const CustomizeButton = ({
  brainId,
}: {
  brainId: string;
}): JSX.Element => {
  const { fetchInstance } = useFetch();
  const { currentBrain, fetchAllBrains } = useBrainContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [isStepFinished, setIsStepFinished] = useState(false);
  const [UIproperty, setUIProperty] = useState<UIpropertyProps>({
    AIBgColor: "#F3E8FF",
    AIFontColor: "#374151",
    AIFontSize: 16,
    UserBgColor: "#F3F4F6",
    UserFontColor: "#374151",
    UserFontSize: 16,
  });

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const requestBody = {
        base_prompt: textValue,
        ui_properties: JSON.stringify(UIproperty),
      };
      const body = JSON.stringify(requestBody);
      await fetchInstance
        .put(`/brains/base-prompt/${brainId}`, body, headers)
        .then(() => {
          setIsLoading(false);
          void fetchAllBrains();
          setIsModalOpen(false);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Wrap handleSend in a closure to provide a void return value
  const handleSendWrapper = () => {
    if (isStepFinished) {
      handleSend()
        .then(() => {
          return;
        })
        .catch((e) => console.log(e));
    } else {
      setIsStepFinished(true);
    }
  };

  const showBaseprompt = async () => {
    try {
      const response = await fetchInstance.get(
        `/brains/base-prompt/${brainId}/`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      const responseData: any = await response.json();
      if ("prompt" in responseData) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        setTextValue(responseData.prompt);
      } else {
        // Handle the case where `prompt` property is not present
        setTextValue("");
      }
    } catch (error) {
      setTextValue("");
      console.log(error);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const onColorChange = (color: string, element: string) => {
    setUIProperty({
      ...UIproperty,
      [element]: color,
    });
  };

  const onFontChange = (font: string, element: string) => {
    setUIProperty({
      ...UIproperty,
      [element]: parseInt(font),
    });
  };

  useEffect(() => {
    if (currentBrain) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-condition
      if (currentBrain.ui_properties !== undefined) {
        if (currentBrain.ui_properties !== "") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setUIProperty(JSON.parse(currentBrain.ui_properties));
        } else {
          setUIProperty(UIpropertyDefault);
        }
      }
    }
  }, [currentBrain]);

  useEffect(() => {
    if (!isModalOpen) {
      setIsStepFinished(false);
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal
        Trigger={
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white transition-colors bg-black border border-black rounded-md outline-none disabled:opacity-80 focus:ring ring-primary/10 dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 sm:px-4 sm:py-2"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={showBaseprompt}
          >
            <BsMagic />
            Customize
          </button>
        }
        title={"Customize your brain"}
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        CloseTrigger={<div />}
      >
        {isStepFinished ? (
          <>
            {/* Customize the Interface */}
            <div className="py-2">
              <p>Edit Your Chat Interface</p>
            </div>
            <div className="flex justify-between mb-3">
              <ColorPicker
                title="Brain Background Color"
                color={UIproperty.AIBgColor}
                onChange={(color) => onColorChange(color, "AIBgColor")}
              />
              <ColorPicker
                title="Brain Font Color"
                color={UIproperty.AIFontColor}
                onChange={(color) => onColorChange(color, "AIFontColor")}
              />
              <div className="my-2">
                <p className="mb-2">Brain Font Size</p>
                <div className="flex gap-2 items-center">
                  <Field
                    className="w-16"
                    name="brain_fontSize"
                    value={UIproperty.AIFontSize}
                    onChange={(e) => onFontChange(e.target.value, "AIFontSize")}
                  />
                  <p>px</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <ColorPicker
                title="User Background Color"
                color={UIproperty.UserBgColor}
                onChange={(color) => onColorChange(color, "UserBgColor")}
              />
              <ColorPicker
                title="User Font Color"
                color={UIproperty.UserFontColor}
                onChange={(color) => onColorChange(color, "UserFontColor")}
              />
              <div className="my-2">
                <p className="mb-2">User Font Size</p>
                <div className="flex gap-2 items-center">
                  <Field
                    className="w-16"
                    name="User_fontSize"
                    value={UIproperty.UserFontSize}
                    onChange={(e) =>
                      onFontChange(e.target.value, "UserFontSize")
                    }
                  />
                  <p>px</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="mb-2">Edit Base Prompt Here</p>
            <textarea
              value={textValue}
              onChange={handleTextChange}
              className="w-full h-[100px] px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 border-black/10 dark:border-white/25 p-auto"
            />
          </>
        )}
        <div className="my-3 flex justify-between gap-3">
          {isStepFinished ? (
            <>
              <Button
                variant={"primary"}
                className="z-20 flex items-center grow justify-center px-4 py-2 text-xl bg-black border rounded-lg shadow-lg align-center border-primary dark:bg-white hover:text-black hover:bg-white top-1"
                onClick={() => setIsStepFinished(false)}
              >
                <BsChevronLeft />
                Back
              </Button>
            </>
          ) : (
            <></>
          )}
          <Button
            variant={"secondary"}
            className="z-20 flex items-center grow justify-center px-4 py-2 text-xl bg-white border rounded-lg shadow-lg align-center border-primary dark:bg-black hover:text-white hover:bg-black top-1"
            onClick={handleSendWrapper}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : isStepFinished ? (
              <BsFillSendFill />
            ) : (
              <></>
            )}
            <p>{isStepFinished ? "Send" : "Next"}</p>
            {isStepFinished ? <></> : <BsChevronRight />}
          </Button>
        </div>
      </Modal>
    </>
  );
};
