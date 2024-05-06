<template>
  <section class="absolute right-5 top-5 select-none">
    <el-tooltip content="画布拖拽开关">
      <el-switch
        inline-prompt
        v-model="dragMode"
        active-text="drag"
        inactive-text="off"
      >
      </el-switch>
    </el-tooltip>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
const dragMode = ref(false);
import { startDrag, endDrag } from "@/core/api/drag";

watch(dragMode, (newVal) => {
  if (newVal) {
    startDrag();
  } else {
    endDrag();
  }
});
</script>
<style scoped lang="less"></style>
