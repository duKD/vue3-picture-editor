<template>
  <div class="w-1/4">
    <el-tooltip placement="top" content="复制">
      <el-button :icon="CopyDocument" class="w-full" @click="handle" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { CopyDocument } from "@element-plus/icons-vue";
import { clone } from "@/core/api/common";
const handle = () => {
  clone();
};
</script>
<style scoped lang="less"></style>
