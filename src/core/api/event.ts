import { getEditor, getEditorCanvas } from "..";
import { fabric } from "fabric";

export enum EditorEventName {
  ONE = "selectOne", // 选中1个
  MULTI = "selectMultiple", // 选中多个
  CANCEL = "selectCancel", // 取消选中
  UPDATE = "update", // 元素是否被修改
}

const handle = () => {
  const editor = getEditor();
  const canvas = getEditorCanvas();
  const actives = canvas.getActiveObjects();

  if (actives && actives.length === 1) {
    editor.emit(EditorEventName.ONE, actives);
  } else if (actives && actives.length > 1) {
    editor.emit(EditorEventName.MULTI, actives);
  } else {
    editor.emit(EditorEventName.CANCEL);
  }
};

const update = () => {
  const editor = getEditor();
  editor.emit(EditorEventName.UPDATE);
};

/**
 * 统一初始化 编辑区域 各种操作事件
 */
export default function initEditorEvent() {
  const canvas = getEditorCanvas();
  canvas.on("selection:created", handle);
  canvas.on("selection:updated", handle);
  canvas.on("selection:cleared", handle);
  canvas.on("object:modified", update);
}
