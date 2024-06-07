/**
 * 用于 移动元素的位置的API
 */

import { fabric } from "fabric";
import { getEditor, getEditorCanvas } from "../index";
import { getWorker } from "./workspace";

// 单个选中元素水平居中
export const moveToCenterX = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  if (!activeObject) {
    return new Error("请选择元素");
  }
  const worker = getWorker();
  const Point = new fabric.Point(
    worker.getCenterPoint().x,
    activeObject.getCenterPoint().y
  );
  activeObject?.setPositionByOrigin(Point, "center", "center");
  canvas.requestRenderAll();
};

// 单个选中元素垂直居中
export const moveToCenterY = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  if (!activeObject) {
    return new Error("请选择元素");
  }
  const worker = getWorker();
  const Point = new fabric.Point(
    activeObject.getCenterPoint().x,
    worker.getCenterPoint().y
  );
  activeObject?.setPositionByOrigin(Point, "center", "center");
  canvas.requestRenderAll();
};

// 单个选中元素垂直水平居中
export const moveToCenter = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  if (!activeObject) {
    return new Error("请选择元素");
  }
  const worker = getWorker();

  activeObject?.setPositionByOrigin(
    worker.getCenterPoint(),
    "center",
    "center"
  );
  canvas.requestRenderAll();
};

// 多个元素选中的情况
export const multiMoveToLeft = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  const selectObjects = canvas.getActiveObjects();
  if (!activeObject) return;
  canvas.discardActiveObject();
  const { left = 0 } = activeObject;
  selectObjects.forEach((item) => {
    const bounding = item.getBoundingRect(true);
    item.set({
      left: left - bounding.left + Number(item.left),
    });
    item.setCoords();
  });

  const activeSelection = new fabric.ActiveSelection(selectObjects, {
    canvas: canvas,
  });
  canvas.setActiveObject(activeSelection);
  canvas.requestRenderAll();
};

export const multiMoveToBottom = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  const selectObjects = canvas.getActiveObjects();
  if (!activeObject) return;
  canvas.discardActiveObject();
  const { top = 0, height = 0 } = activeObject;
  selectObjects.forEach((item) => {
    const bounding = item.getBoundingRect(true);
    item.set({
      top: top + height - (bounding.top + bounding.height) + Number(item.top),
    });
  });
  const activeSelection = new fabric.ActiveSelection(selectObjects, {
    canvas: canvas,
  });
  canvas.setActiveObject(activeSelection);
  canvas.requestRenderAll();
};

export const multiMoveToTop = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  const selectObjects = canvas.getActiveObjects();
  if (!activeObject) return;
  canvas.discardActiveObject();
  const { top = 0 } = activeObject;
  selectObjects.forEach((item) => {
    const bounding = item.getBoundingRect(true);
    item.set({
      top: top - bounding.top + Number(item.top),
    });
  });
  const activeSelection = new fabric.ActiveSelection(selectObjects, {
    canvas: canvas,
  });
  canvas.setActiveObject(activeSelection);
  canvas.requestRenderAll();
};

export const multiMoveToRight = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  const selectObjects = canvas.getActiveObjects();
  if (!activeObject) return;
  canvas.discardActiveObject();
  const { left = 0, width = 0 } = activeObject;
  selectObjects.forEach((item) => {
    const bounding = item.getBoundingRect(true);
    item.set({
      left: left + width - (bounding.left + bounding.width) + Number(item.left),
    });
  });
  const activeSelection = new fabric.ActiveSelection(selectObjects, {
    canvas: canvas,
  });
  canvas.setActiveObject(activeSelection);
  canvas.requestRenderAll();
};

// 水平居中对齐
export const multiMoveToHorizontalCenter = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  const selectObjects = canvas.getActiveObjects();
  if (!activeObject) return;
  canvas.discardActiveObject();
  const { left = 0, width = 0 } = activeObject;
  selectObjects.forEach((item) => {
    const bounding = item.getBoundingRect(true);
    item.set({
      left:
        left +
        width / 2 -
        (bounding.left + bounding.width / 2) +
        Number(item.left),
    });
  });
  const activeSelection = new fabric.ActiveSelection(selectObjects, {
    canvas: canvas,
  });
  canvas.setActiveObject(activeSelection);
  canvas.requestRenderAll();
};

//垂直居中对齐
export const multiMoveToVerticalCenter = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  const selectObjects = canvas.getActiveObjects();
  if (!activeObject) return;
  canvas.discardActiveObject();
  const { top = 0, height = 0 } = activeObject;
  selectObjects.forEach((item) => {
    const bounding = item.getBoundingRect(true);
    item.set({
      top:
        top +
        height / 2 -
        (bounding.top + bounding.height / 2) +
        Number(item.top),
    });
  });
  const activeSelection = new fabric.ActiveSelection(selectObjects, {
    canvas: canvas,
  });
  canvas.setActiveObject(activeSelection);
  canvas.requestRenderAll();
};
