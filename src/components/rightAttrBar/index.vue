<template>
  <set-size v-show="!selectInfo.mode" />
  <set-bg v-show="!selectInfo.mode" />
  <handle-group
    v-show="isMultiple || isGroup"
    :isMultiple="isMultiple"
    :is-group="isGroup"
  />
  <replace-img v-show="isImg" />
  <div class="flex justify-around px-40px py-20px">
    <set-lock v-show="isSingle" />
    <to-del v-show="selectInfo.mode" />
    <to-clone v-show="selectInfo.mode" />
  </div>
  <!-- 单个元素对齐方式 -->
  <set-align v-show="isSingle" />
  <!-- 多个元素对齐方式 -->
  <multiple-align v-show="isMultiple" />
  <base-attrs v-show="isSingle" :is-text="isText" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import setSize from "./set-size.vue";
import baseAttrs from "./base-attrs.vue";
import setBg from "./set-bg.vue";
import replaceImg from "./replace-img.vue";
import setLock from "./set-lock.vue";
import setAlign from "./set-align.vue";
import multipleAlign from "./multiple-align.vue";
import toDel from "./to-del.vue";
import toClone from "./to-clone.vue";
import handleGroup from "./handle-group.vue";
import useEditorSelect from "@/hooks/useEditorSelect";
import { isTextType, isImageType, isGroupType } from "@/core/utils";
import { SelectMode } from "@/core/type";

const selectInfo = useEditorSelect();

// 单选且等于组元素
const isGroup = computed(
  () =>
    selectInfo.mode === SelectMode.ONE && isGroupType(selectInfo.selectOneType)
);
// 是否为多选
const isMultiple = computed(() => selectInfo.mode === SelectMode.MULTI);

// 是否为单选
const isSingle = computed(() => selectInfo.mode === SelectMode.ONE);

const isImg = computed(
  () =>
    selectInfo.mode === SelectMode.ONE && isImageType(selectInfo.selectOneType)
);

const isText = computed(
  () =>
    selectInfo.mode === SelectMode.ONE && isTextType(selectInfo.selectOneType)
);
</script>
<style scoped lang="less"></style>
