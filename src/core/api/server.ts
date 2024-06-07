import { getEditorCanvas } from "../index";
import { resetWorkSpace } from "./workspace";
import { reset, setTrack } from "./history";
import { downFile } from "../utils";

export function insertSvgFile(jsonFile: string) {
  const canvas = getEditorCanvas();
  setTrack(false);
  canvas.loadFromJSON(jsonFile, () => {
    // 加载新模版后 重置 画布位置
    resetWorkSpace();
    canvas.renderAll();
    setTrack(true);
    reset();
  });
}

export function toJSON() {
  const canvas = getEditorCanvas();
  return canvas.toJSON([
    "id",
    "gradientAngle",
    "selectable",
    "hasControls",
    "linkData",
  ]);
}

export function download() {
  const canvas = getEditorCanvas();
  console.log("download", canvas);
  resetWorkSpace();

  const date_url = canvas.toDataURL();
  downFile(date_url, "png");
}
