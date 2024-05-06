<template>
  <section
    class="absolute right-5 top-20 flex flex-col justify-between h-80px cursor-pointer"
  >
    <el-icon size="20" @click="big"><ZoomIn /></el-icon>
    <el-icon size="20" @click="reset"><Aim /></el-icon>
    <el-icon size="20" @click="small"><ZoomOut /></el-icon>
  </section>
</template>

<script lang="ts" setup>
import {
  shrinkWorkSpace,
  magnifyWorkSpace,
  resetWorkSpace,
} from "@/core/api/workspace";
const big = () => {
  magnifyWorkSpace();
};

const reset = () => {
  resetWorkSpace();
};

const small = () => {
  shrinkWorkSpace();
};
</script>
<style scoped lang="less"></style>
