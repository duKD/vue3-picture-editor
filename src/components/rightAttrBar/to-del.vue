<template>
  <div class="w-1/4">
    <el-tooltip placement="top" content="删除">
      <el-button :icon="Delete" class="w-full" @click="handle" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Delete } from "@element-plus/icons-vue";
import { del } from "@/core/api/common";
const handle = () => {
  del();
};
</script>
<style scoped lang="less"></style>
