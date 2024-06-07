/**
 *  文本元素相关操作
 */

import { getEditorCanvas } from "..";
import { save } from "./history";
import { isTextType } from "../utils";

type keyOfValueArray<T> = {
  [P in keyof T]: [P, T[P]];
}[keyof T];

type OptionsType = {
  textAlign: string;
  fontSize: number;
  fontWeight: "normal" | "bold";
  fontStyle: "italic" | "normal";
  linethrough: boolean | undefined;
  underline: boolean | undefined;
  fill: string | undefined;
};

export const isText = (
  obj: fabric.Object
): obj is fabric.IText | fabric.Textbox | fabric.Text => {
  return isTextType(obj.type || "");
};

export const changeAttr = (...args: keyOfValueArray<OptionsType>) => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  if (!isText(activeObject)) return;
  activeObject.set({
    [args[0]]: args[1],
  });
  canvas.requestRenderAll();
  // 保存操作记录
  save();
};
