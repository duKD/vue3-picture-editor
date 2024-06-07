<template>
  <div class="w-200px px-30px">
    <ElButton :type="status.canUndo ? 'primary' : 'default'" @click="handle(1)"
      >撤销</ElButton
    >
    <ElButton :type="status.canRedo ? 'primary' : 'default'" @click="handle(2)"
      >重做</ElButton
    >
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onUnmounted } from "vue";
import {
  getStatus,
  redo,
  undo,
  HistoryEditorEventName,
} from "@/core/api/history";
import { getEditor } from "@/core";

const status = reactive({
  canUndo: false,
  canRedo: false,
});

const handle = async (type = 1) => {
  if (type === 1) {
    await undo();
  } else {
    await redo();
  }
};

const editor = getEditor();

const change = () => {
  const res = getStatus();
  console.log("getStatus---", res);
  status.canUndo = res.canUndo;
  status.canRedo = res.canRedo;
};

onMounted(() => {
  editor.on(HistoryEditorEventName.STATUS_CHANGE, change);
});

onUnmounted(() => {
  editor.off(HistoryEditorEventName.STATUS_CHANGE, change);
});
</script>
<style scoped lang="less"></style>
