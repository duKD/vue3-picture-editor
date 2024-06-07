<template>
  <div class="flex px-30px">
    <el-button class="w-80px" @click="handle(1)"> 水平居中 </el-button>
    <el-button class="w-120px" @click="handle(2)"> 水平垂直居中 </el-button>
    <el-button class="w-80px" @click="handle(3)"> 垂直居中 </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  moveToCenterX,
  moveToCenter,
  moveToCenterY,
} from "@/core/api/position";
const handle = (type: number) => {
  if (type === 1) {
    moveToCenterX();
  } else if (type === 2) {
    moveToCenter();
  } else {
    moveToCenterY();
  }
};
</script>
<style scoped lang="less"></style>
