import { getEditor, getEditorCanvas } from "@/core";
import { EditorEventName } from "@/core/api/event";
import { isText } from "@/core/api/text";
import { reactive, onMounted, onBeforeMount } from "vue";

type FontAttrType = {
  fontSize: number | undefined;
  fontFamily: string | undefined;
  lineHeight: number | undefined;
  fill: string;
  fontWeight: string | number | undefined;
  textBackgroundColor: string | undefined;
  textAlign: string | undefined;
  fontStyle: string | undefined;
  underline: boolean | undefined;
  linethrough: boolean | undefined;
};

export default function useHandleELAttr() {
  const fontAttr = reactive<FontAttrType>({
    fontSize: 0, // 字号
    fontFamily: "", // 字体
    lineHeight: 0, // 行高
    fontWeight: "normal", // 字体粗细
    textBackgroundColor: "#fff", //背景
    textAlign: "", // 字体对齐方式
    fontStyle: "", // 斜体
    fill: "", // 字体颜色
    underline: false, // 下划线
    linethrough: false, // 删除划线
  });

  const updateAttr = (e?: fabric.IEvent<Event>) => {
    const canvas = getEditorCanvas();
    const activeObject = canvas.getActiveObject();

    if (!activeObject) return;
    // 不是当前obj，跳过
    if (e && e.target && e.target !== activeObject) return;

    // 处理字体相关属性
    if (isText(activeObject)) {
      fontAttr.fontSize = activeObject.fontSize;
      fontAttr.fontFamily = activeObject.fontFamily;
      fontAttr.lineHeight = activeObject.lineHeight;
      fontAttr.fontWeight = activeObject.fontWeight;
      fontAttr.textBackgroundColor = activeObject.textBackgroundColor;
      fontAttr.textAlign = activeObject.textAlign;
      fontAttr.fontStyle = activeObject.fontStyle;
      fontAttr.underline = !!activeObject.underline;
      fontAttr.linethrough = !!activeObject.linethrough;
      fontAttr.fill = (activeObject.fill as string) || "";
    }
  };

  const editor = getEditor();

  onMounted(() => {
    editor.on(EditorEventName.UPDATE, updateAttr);
    editor.on(EditorEventName.ONE, updateAttr);
  });

  onBeforeMount(() => {
    editor.off(EditorEventName.UPDATE, updateAttr);
    editor.off(EditorEventName.ONE, updateAttr);
  });

  return {
    fontAttr,
    updateAttr,
  };
}
