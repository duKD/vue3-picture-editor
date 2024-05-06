import { getEditor } from "@/core";
import { EditorEventName } from "@/core/api/event";
import { fabric } from "fabric";
import { onBeforeMount, onMounted, reactive } from "vue";

export enum SelectMode {
  EMPTY = "",
  ONE = "one",
  MULTI = "multiple",
}

type SelectInfo = {
  mode: SelectMode;
  selectOneType: string;
  selectIds: string[];
};
/**
 * 处理 画布选中元素的信息的hook
 */
export default function useEditorSelect() {
  const editor = getEditor();
  const selectInfo = reactive<SelectInfo>({
    mode: SelectMode.EMPTY,
    selectOneType: "",
    selectIds: [], // 选择ids
  });

  const selectOne = (e: [fabric.Object]) => {
    selectInfo.mode = SelectMode.ONE;
    if (e.length) {
      selectInfo.selectOneType = e[0].type || "";
      selectInfo.selectIds = e.map((item) => item.id || "");
    }
  };

  const selectMulti = (e: fabric.Object[]) => {
    selectInfo.mode = SelectMode.MULTI;
    selectInfo.selectOneType = "";
    selectInfo.selectIds = e.map((item) => item.id || "");
  };

  const selectCancel = () => {
    selectInfo.selectIds = [];
    selectInfo.mode = SelectMode.EMPTY;
    selectInfo.selectOneType = "";
  };

  onMounted(() => {
    editor.on(EditorEventName.ONE, selectOne);
    editor.on(EditorEventName.MULTI, selectMulti);
    editor.on(EditorEventName.CANCEL, selectCancel);
  });

  onBeforeMount(() => {
    editor.off(EditorEventName.ONE, selectOne);
    editor.off(EditorEventName.MULTI, selectMulti);
    editor.off(EditorEventName.CANCEL, selectCancel);
  });

  return selectInfo;
}
