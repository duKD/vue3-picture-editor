<template>
  <div class="mx-40px">
    <el-divider content-position="left">多选框内位移</el-divider>
    <div class="flex flex-wrap justify-around">
      <el-button class="w-60px" @click="multiMoveToTop"> 上对齐 </el-button>
      <el-button class="w-60px" @click="multiMoveToBottom"> 下对齐 </el-button>
      <el-button class="w-60px" @click="multiMoveToLeft"> 左对齐 </el-button>
      <el-button class="w-60px" @click="multiMoveToRight"> 右对齐 </el-button>
      <div class="w-full h-20px" />
      <el-button class="w-120px" @click="multiMoveToHorizontalCenter">
        水平居中对齐
      </el-button>
      <el-button class="w-120px" @click="multiMoveToVerticalCenter">
        垂直居中对齐
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  multiMoveToLeft,
  multiMoveToBottom,
  multiMoveToTop,
  multiMoveToRight,
  multiMoveToHorizontalCenter,
  multiMoveToVerticalCenter,
} from "@/core/api/position";
const handle = (num: number) => {};
</script>
<style scoped lang="less"></style>
