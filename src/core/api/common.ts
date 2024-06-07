import { getEditorCanvas } from "..";
import { generateUUIDBasedOnTime } from "../utils";
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

// 锁定/解锁 某个对象
export const setLock = (obj: fabric.Object, isLock: boolean) => {
  const lockAttrs = [
    "lockMovementX",
    "lockMovementY",
    //   "lockRotation",
    //   "lockScalingX",
    //   "lockScalingY",
  ];
  // 修改自定义属性
  obj.hasControls = isLock;
  // 修改默认属性
  lockAttrs.forEach((key) => {
    // @ts-ignore
    obj[key] = !isLock;
  });

  const canvas = getEditorCanvas();
  canvas?.renderAll();
};

// 删除画布中选中的对象
export const del = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObjects();
  if (activeObject) {
    activeObject.map((item) => canvas.remove(item));
    canvas.requestRenderAll();
    canvas.discardActiveObject();
  }
};

// 复制画布选中元素
export const clone = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject();
  console.log("clone-----", activeObject);
  if (!activeObject) return;
  // 间距设置
  const grid = 30;
  if (activeObject.type === "activeSelection") {
    // 选择多个元素的情况
    activeObject.clone((cloned: fabric.Object) => {
      // 再次进行克隆，处理选择多个对象的情况
      cloned.clone((clonedObj: fabric.ActiveSelection) => {
        canvas.discardActiveObject();
        if (clonedObj.left === undefined || clonedObj.top === undefined) return;
        // 将克隆的画布重新赋值
        clonedObj.canvas = canvas;
        // 设置位置信息
        clonedObj.set({
          left: clonedObj.left + grid,
          top: clonedObj.top + grid,
          evented: true,
          id: generateUUIDBasedOnTime(),
        });
        clonedObj.forEachObject((obj: fabric.Object) => {
          obj.id = generateUUIDBasedOnTime();
          canvas.add(obj);
        });
        // 解决不可选择问题
        clonedObj.setCoords();
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
      });
    });
  } else {
    activeObject.clone((cloned: fabric.Object) => {
      if (cloned.left === undefined || cloned.top === undefined) return;
      canvas.discardActiveObject();
      // 设置位置信息
      cloned.set({
        left: cloned.left + grid,
        top: cloned.top + grid,
        evented: true,
        id: generateUUIDBasedOnTime(),
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.requestRenderAll();
    });
  }
};
