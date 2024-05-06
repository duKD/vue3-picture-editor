<template>
  <div class="w-full p-40px pb-0">
    <el-divider content-position="left">尺寸</el-divider>
    <el-form :model="form">
      <el-form-item field="width" label="宽">
        <el-input-number
          v-model="form.width"
          placeholder="1200"
          :step="10"
          :max="2000"
          :min="100"
        />
      </el-form-item>
      <el-form-item field="width" label="高">
        <el-input-number
          v-model="form.height"
          placeholder="800"
          :step="10"
          :max="2000"
          :min="100"
        />
      </el-form-item>
    </el-form>
    <section class="flex justify-end">
      <el-button type="primary" @click="set"> 设置 </el-button>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { setSize } from "@/core/api/workspace";
import { reactive } from "vue";
const form = reactive({
  width: 900,
  height: 1200,
});

const set = () => {
  setSize(form.width, form.height);
};
</script>
<style scoped lang="less"></style>
