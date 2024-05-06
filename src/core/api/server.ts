import { getEditorCanvas } from "../index";
import { resetWorkSpace } from "./workspace";

export function insertSvgFile(jsonFile: string) {
  const canvas = getEditorCanvas();
  canvas.loadFromJSON(jsonFile, () => {
    // 加载新模版后 重置 画布位置
    resetWorkSpace();
    canvas.renderAll();
  });
}
