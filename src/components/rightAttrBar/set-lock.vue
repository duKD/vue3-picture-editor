<template>
  <div class="w-1/4">
    <el-tooltip placement="top" :content="isLock ? '解锁' : '锁定'">
      <el-button :icon="showIcon" class="w-full" @click="handle" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, computed, ref } from "vue";
import { Lock, Unlock } from "@element-plus/icons-vue";
import { getEditor } from "@/core";
import { EditorEventName } from "@/core/api/event";
import { fabric } from "fabric";
import { setLock } from "@/core/api/common";

const editor = getEditor();

const isLock = ref(false);

const showIcon = computed(() => {
  return isLock.value ? Unlock : Lock;
});

const handle = () => {
  if (selectActive.value) {
    setLock(selectActive.value, isLock.value);
    isLock.value = !isLock.value;
  }
};

const selectActive = ref<fabric.Object | null>(null);

const handleSelected = (items: any) => {
  isLock.value = !items[0].hasControls;
  selectActive.value = items[0];
};

onMounted(() => {
  editor.on(EditorEventName.ONE, handleSelected);
});

onBeforeUnmount(() => {
  editor.off(EditorEventName.ONE, handleSelected);
});
</script>
<style scoped lang="less"></style>
