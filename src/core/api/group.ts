import { getEditorCanvas } from "..";
import { fabric } from "fabric";
import { generateUUIDBasedOnTime } from "../utils";
import { TextType } from "../type";

let isDown = false;

//组内文字编辑
export default function initGroup() {
  const canvas = getEditorCanvas();

  const _getGroupObj = (opt: fabric.IEvent<MouseEvent>) => {
    const pointer = canvas.getPointer(opt.e, true);

    // 通过点击区域 确定组内的被点击的元素
    const clickObj = canvas._searchPossibleTargets(
      // @ts-ignore
      opt.target?._objects,
      pointer
    );
    return clickObj;
  };

  //通过组合重新组装来编辑文字
  const _bindingTextEditingEvent = (
    textObject: any,
    opt: fabric.IEvent<MouseEvent>
  ) => {
    if (!opt.target) return;
    const textObjectJSON = textObject.toObject();
    const groupObj = opt.target;

    const fType: any = {
      "i-text": "IText",
      text: "Text",
      textbox: "Textbox",
    };

    const elType: TextType = fType[textObjectJSON.type] as TextType;

    const groupMatrix: number[] = groupObj.calcTransformMatrix();

    const a: number = groupMatrix[0];
    const b: number = groupMatrix[1];
    const c: number = groupMatrix[2];
    const d: number = groupMatrix[3];
    const e: number = groupMatrix[4];
    const f: number = groupMatrix[5];

    const newX = a * textObject.left + c * textObject.top + e;
    const newY = b * textObject.left + d * textObject.top + f;

    const tempText = new fabric[elType](textObject.text, {
      ...textObjectJSON,
      left: newX,
      top: newY,
    });
    tempText.id = generateUUIDBasedOnTime();
    textObject.visible = false;
    // @ts-ignore
    opt.target.addWithUpdate();
    tempText.visible = true;
    tempText.selectable = true;
    // @ts-ignore
    tempText.hasConstrols = false;
    // @ts-ignore
    tempText.editable = true;
    canvas.add(tempText);
    canvas.setActiveObject(tempText);
    // @ts-ignore
    tempText.enterEditing();
    // @ts-ignore
    tempText.selectAll();

    tempText.on("editing:exited", () => {
      // 退出编辑模式时触发
      textObject.set({
        ...tempText.toObject(),
        left: textObject.left,
        top: textObject.top,
        visible: true,
      });
      // @ts-ignore
      opt.target.addWithUpdate();
      tempText.visible = false;
      canvas.remove(tempText);
      // @ts-ignore
      canvas.setActiveObject(opt.target);
    });
  };

  const isText = (obj: fabric.Object) => {
    return obj.type && ["i-text", "text", "textbox"].includes(obj.type);
  };

  canvas.on("mouse:down", (opt) => {
    isDown = true;
    // 重置选中controls
    if (
      opt.target &&
      !opt.target.lockMovementX &&
      !opt.target.lockMovementY &&
      !opt.target.lockRotation &&
      !opt.target.lockScalingX &&
      !opt.target.lockScalingY
    ) {
      opt.target.hasControls = true;
    }
  });

  canvas.on("mouse:up", () => {
    isDown = false;
  });

  canvas.on("mouse:dblclick", (opt) => {
    if (opt.target && opt.target.type === "group") {
      const selectedObject = _getGroupObj(opt) as fabric.IText;

      if (!selectedObject) return;
      if (isText(selectedObject)) {
        _bindingTextEditingEvent(selectedObject, opt);
        return;
      }
      canvas.renderAll();
    }
  });
}

export const group = () => {
  const canvas = getEditorCanvas();
  // 组合元素
  const activeObj = canvas.getActiveObject() as fabric.ActiveSelection;
  if (!activeObj) return;
  const activeGroup = activeObj.toGroup();
  const objectsInGroup = activeGroup.getObjects();
  activeGroup.clone((newGroup: fabric.Group) => {
    newGroup.set("id", generateUUIDBasedOnTime());
    canvas.remove(activeGroup);
    objectsInGroup.forEach((object) => {
      canvas.remove(object);
    });
    canvas.add(newGroup);
    canvas.setActiveObject(newGroup);
  });
};

export const unGroup = () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObject() as fabric.Group;
  if (!activeObject) return;
  // 先获取当前选中的对象，然后打散
  activeObject.toActiveSelection();
  activeObject.getObjects().forEach((item: fabric.Object) => {
    item.set("id", generateUUIDBasedOnTime());
  });
  canvas.discardActiveObject().renderAll();
};
