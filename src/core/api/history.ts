import { getEditorCanvas, getEditor } from "..";
import { toJSON } from "./server";
import { resetWorkSpace } from "./workspace";

export enum HistoryEditorEventName {
  STATUS_CHANGE = "historyStatusChange",
}

const _state: {
  stackList: Array<any>; // 记录容器
  point: number; // 记录指正针
} = {
  stackList: [],
  point: 0,
};

const proxy = new Proxy(_state, {
  set: function (obj, prop, value) {
    obj[prop as keyof typeof obj] = value;
    const editor = getEditor();
    // 通知 history 记录状态有更新
    editor.emit(HistoryEditorEventName.STATUS_CHANGE);
    console.log("proxy---", proxy);

    return true;
  },
});

let isTrack = true;

export const save = (event?: fabric.IEvent) => {
  console.log(111111, isTrack);

  if (!isTrack) return;
  console.log("save---");
  // 过滤选择元素事件
  if (event) {
    const isSelect = event.action === undefined && event.e;
    if (isSelect) return;
  }

  console.log("save---true");
  const len = proxy.stackList.length;
  const json = toJSON();
  if (len === 0) {
    proxy.point = 0;
    proxy.stackList = [json];
  } else {
    let temp = proxy.stackList;
    temp = temp.splice(0, ++proxy.point);
    proxy.stackList = [...temp, json];
  }
};

export default function initHistory() {
  const canvas = getEditorCanvas();
  canvas.on("object:added", save);
  canvas.on("object:modified", save);
  canvas.on("selection:updated", save);

  canvas.on("object:modified", () => {
    console.log("object:modified------");
  });
  canvas.on("selection:updated", () => {
    console.log("selection:updated------");
  });
}

export const setTrack = (val: boolean) => {
  isTrack = val;
};

// 基于当前画布重置操作历史记录
export const reset = () => {
  proxy.stackList = [];
  save();
};

// 撤销
export const undo = () => {
  return new Promise((resolve) => {
    if (!isTrack) resolve("");
    isTrack = false;
    const { canUndo } = getStatus();
    if (canUndo) {
      const json = proxy.stackList[--proxy.point];
      const canvas = getEditorCanvas();
      canvas.loadFromJSON(JSON.stringify(json), () => {
        // 加载新模版后 重置 画布位置
        resetWorkSpace();
        canvas.renderAll();
        isTrack = true;
        resolve("");
      });
    } else {
      isTrack = true;
    }
  });
};

// 重做
export const redo = () => {
  return new Promise((resolve) => {
    if (!isTrack) resolve("");
    isTrack = false;
    const { canRedo } = getStatus();
    if (canRedo) {
      const json = proxy.stackList[++proxy.point];
      const canvas = getEditorCanvas();
      console.log("redo-----1");
      canvas.loadFromJSON(JSON.stringify(json), () => {
        console.log("redo-----2");

        // 加载新模版后 重置 画布位置
        resetWorkSpace();
        canvas.renderAll();
        isTrack = true;
        resolve("");
      });
    } else {
      isTrack = true;
    }
  });
};

//判断 是否可以 撤销 重做
export const getStatus = () => {
  return {
    canUndo: proxy.point !== 0,
    canRedo: proxy.point < proxy.stackList.length - 1,
  };
};
