<template>
  <div class="mt-30px mx-30px">
    <div v-show="props.isText">
      <el-divider content-position="left">字体属性</el-divider>
      <div class="py-10px">文字排列方向：</div>
      <div class="flex flex-wrap justify-around">
        <el-radio-group
          v-model="fontAttr.textAlign"
          @change="handleTextAlign"
          size="large"
        >
          <el-radio-button label="左对齐" value="left" />
          <el-radio-button label="居中对齐" value="center" />
          <el-radio-button label="右对齐" value="right" />
        </el-radio-group>
      </div>
      <div class="py-10px">字体相关设置：</div>
      <div class="flex flex-wrap justify-around">
        <el-button
          :type="fontAttr.fontWeight === 'bold' ? 'primary' : 'default'"
          class="w-60px"
          @click="toChangeFontWeight"
        >
          加粗
        </el-button>
        <el-button
          :type="fontAttr.fontStyle === 'italic' ? 'primary' : 'default'"
          class="w-60px"
          @click="toChangeFontStyle"
        >
          斜体
        </el-button>
        <el-button
          :type="fontAttr.linethrough ? 'primary' : 'default'"
          class="w-60px"
          @click="toSetLineThrough"
        >
          中划线
        </el-button>
        <el-button
          :type="fontAttr.underline ? 'primary' : 'default'"
          class="w-60px"
          @click="toSetUnderline"
        >
          下划线
        </el-button>
      </div>
      <div class="py-10px">
        颜色：<el-color-picker v-model="fontAttr.fill" @change="toSetColor" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import { changeAttr } from "@/core/api/text";
import useHandleELAttr from "@/hooks/useHandleELAttr";

type PropsType = {
  isText: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  isText: false,
});

const { fontAttr, updateAttr } = useHandleELAttr();

const handleTextAlign = (str: any) => {
  changeAttr("textAlign", str);
};

const toChangeFontWeight = () => {
  const value = fontAttr.fontWeight === "normal" ? "bold" : "normal";
  changeAttr("fontWeight", value);
  updateAttr();
};

const toChangeFontStyle = () => {
  const value = fontAttr.fontStyle === "normal" ? "italic" : "normal";
  changeAttr("fontStyle", value);
  updateAttr();
};

const toSetLineThrough = () => {
  const value = !fontAttr.linethrough;
  changeAttr("linethrough", value);
  updateAttr();
};

const toSetUnderline = () => {
  const value = !fontAttr.underline;
  changeAttr("underline", value);
  updateAttr();
};

const toSetColor = () => {
  const value = fontAttr.fill;
  changeAttr("fill", value);
  updateAttr();
};
</script>
<style scoped lang="less"></style>
