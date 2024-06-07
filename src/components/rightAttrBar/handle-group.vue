<template>
  <div class="mx-40px mt-40px">
    <el-button class="w-full" @click="handle">{{ btnText }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { group, unGroup } from "@/core/api/group";
const props = defineProps<{
  isMultiple: boolean;
  isGroup: boolean;
}>();

const btnText = computed(() => {
  return props.isMultiple ? "组合" : props.isGroup ? "拆分组" : "";
});

const handle = () => {
  if (props.isMultiple) {
    // 组合
    group();
  } else if (props.isGroup) {
    // 拆分
    unGroup();
  }
};
</script>
<style scoped lang="less"></style>
