import { Editor, getEditor, getEditorCanvas } from "../index";
import { callWithErrorHandling } from "../utils";

// 对画布进行拖拽

let dragMode: boolean = false;

let canDrag: boolean = false;

const prePosition = {
  lastPosX: 0,
  lastPosY: 0,
};

export const startDrag = () => {
  dragMode = true;
  const canvas = getEditorCanvas();
  canvas.defaultCursor = "grab";
  canvas.renderAll();
};

export const endDrag = () => {
  dragMode = false;
  const canvas = getEditorCanvas();
  canvas.defaultCursor = "default";
  canvas.renderAll();
};

export default function _initDrag() {
  const canvas = getEditorCanvas();

  canvas.on("mouse:down", (opt: any) =>
    callWithErrorHandling((opt: any) => {
      if (!dragMode) return;
      canDrag = true;
      // 关闭所有正在编辑的对象
      canvas.discardActiveObject();
      // 工作区的内容 拖拽期间不允许被选中
      canvas.getObjects().forEach((obj) => {
        obj.selectable = false;
      });
      prePosition.lastPosX = opt.e.clientX;
      prePosition.lastPosY = opt.e.clientY;
      canvas.renderAll();
    }, opt)
  );

  canvas.on("mouse:move", (opt: any) =>
    callWithErrorHandling((opt: any) => {
      if (!dragMode || !canDrag) return;
      if (!canvas.viewportTransform) return;
      const { e } = opt;
      const vpt = canvas.viewportTransform;
      vpt[4] += e.clientX - prePosition.lastPosX;
      vpt[5] += e.clientY - prePosition.lastPosY;
      prePosition.lastPosX = e.clientX;
      prePosition.lastPosY = e.clientY;
      canvas.requestRenderAll();
    }, opt)
  );

  canvas.on("mouse:up", (opt: any) =>
    callWithErrorHandling((opt: any) => {
      if (!dragMode || !canDrag) return;
      canDrag = false;
      if (canvas.viewportTransform) {
        canvas.setViewportTransform(canvas.viewportTransform);
      }
      canvas.getObjects().forEach((obj) => {
        if (obj.id !== "workspace" && obj.hasControls) {
          obj.selectable = true;
        }
      });
      canvas.renderAll();
    }, opt)
  );
}
