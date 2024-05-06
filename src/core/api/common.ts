import { getEditorCanvas } from "..";
import { getWorker } from "./workspace";

/**
 * 设置 工作区的颜色
 * @param color
 */
export const setWorkspaceBg = (color: string) => {
  const canvas = getEditorCanvas();
  const workspace = getWorker();
  workspace.set("fill", color);
  canvas.renderAll();
};
