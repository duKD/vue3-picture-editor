<template>
  <set-size v-if="!selectInfo.mode" />
  <set-bg v-if="!selectInfo.mode" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useEditorSelect from "@/hooks/useEditorSelect";
import setSize from "./set-size.vue";
import setBg from "./set-bg.vue";

const selectInfo = useEditorSelect();
</script>
<style scoped lang="less"></style>
