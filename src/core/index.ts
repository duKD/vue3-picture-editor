import { fabric } from "fabric";
import EventEmitter from "events";
import _initWorkSpace from "./api/workspace";
import _initControl from "./initControl";
import _initGuideLine from "./initGuideLine";
import _initDrag from "./api/drag";
import _initEditorEvent from "./api/event";
import _initGroup from "./api/group";
import _initHistory from "./api/history";

export type EditorOPtions = {
  id: string;
  options?: any;
};

let editor: Editor;

export class Editor extends EventEmitter {
  canvas: fabric.Canvas | null = null;
  workspaceEl?: HTMLElement;
  opt: any;
  constructor(opt: EditorOPtions) {
    super();
    this.opt = opt;
  }

  // 初始化工作区 需要在挂载dom渲染完成之后调用
  init(workspaceEl: HTMLElement) {
    const { id, options = {} } = this.opt;
    if (!workspaceEl) {
      return console.warn("workspaceEl is not mount");
    }

    this.canvas = new fabric.Canvas(id, {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 画布禁止默认右键菜单
      preserveObjectStacking: true, // 指示对象在选中时是否应保持在当前堆栈位置。
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
      fill: this.opt?.bg || "#999",
    });
    //初始化 设置 画布元素选中后的样式
    _initControl(options);
    // 初始化 设置辅助线
    _initGuideLine();
    //初始化 画布拖拽
    _initDrag();
    this.workspaceEl = workspaceEl;
    // 初始化画布
    _initWorkSpace(options);
    // 初始化画布相关事件
    _initEditorEvent();
    _initGroup();
    _initHistory();
  }
}

// 获取editor
export const getEditor = () => {
  if (!editor) {
    throw new Error("editor is not init");
  }
  return editor;
};

// 获取canvas
export const getEditorCanvas = () => {
  if (!editor.canvas) {
    throw new Error("canvas is not init");
  }
  return editor.canvas;
};

// 获取 工作空间容器dom
export const getEditorWorkspaceEl = () => {
  if (!editor.workspaceEl) {
    throw new Error("WorkspaceEl is not init");
  }
  return editor.workspaceEl;
};

// 全局只保存一个editor
export function createEditor(opt: EditorOPtions): Editor {
  if (editor) {
    return editor;
  }
  editor = new Editor(opt);
  return editor;
}
