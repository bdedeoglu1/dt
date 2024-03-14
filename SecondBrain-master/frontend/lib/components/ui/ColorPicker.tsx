/* eslint-disable */
"use client";

import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { FiEdit, FiSave } from "react-icons/fi";
import Field from "./Field";

interface ColorPickerProps {
  title: string;
  color: string;
  onChange: (color: string) => void;
}
const ColorPicker = ({
  title,
  color,
  onChange,
}: ColorPickerProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="my-2">{title}</div>
      <div className="flex gap-2 items-center">
        <Field className="w-[120px]" disabled name="" value={color} />
        <div className="w-6 h-6 sticky left-32" style={{ backgroundColor: color }} />
        {isVisible ? (
          <FiSave className="hover:cursor-pointer" onClick={() => setIsVisible((prev) => !prev)} />
        ) : (
          <FiEdit className="hover:cursor-pointer" onClick={() => setIsVisible((prev) => !prev)} />
        )}
      </div>
      <SketchPicker
        className={`sticky ${isVisible ? "" : "hidden"}`}
        color={color}
        onChange={(color: ColorResult) => {
          onChange(color.hex);
        }}
      />
    </div>
  );
};

export default ColorPicker;
