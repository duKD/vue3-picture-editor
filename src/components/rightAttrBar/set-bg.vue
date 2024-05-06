<template>
  <div class="w-full p-40px pb-0">
    <el-divider content-position="left">背景颜色</el-divider>
    <el-color-picker v-model="color" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { setWorkspaceBg } from "@/core/api/common";
const color = ref("");
watch(color, (newVal) => {
  setWorkspaceBg(newVal);
});
</script>
<style scoped lang="less"></style>
