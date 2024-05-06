<template>
  <div>
    <el-divider content-position="left">默认模版</el-divider>
    <el-tooltip content="酒店模版">
      <img :src="templatePre" @click="createTemplate" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import templatePre from "@/assets/images/template/1.png";
import data from "@/assets/images/template/1.json";
import { insertSvgFile } from "@/core/api/server";

const createTemplate = () => {
  insertSvgFile(JSON.stringify(data));
};
</script>
<style scoped lang="less"></style>
