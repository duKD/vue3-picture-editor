<template>
  <div class="px-40px py-20px">
    <el-button class="w-full" @click="replace">替换图片</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { selectFiles, getImgStr, insertImgFile } from "@/utils/common";
import { getEditorCanvas } from "@/core";

const replace = async () => {
  const canvas = getEditorCanvas();
  const activeObject = canvas.getActiveObjects()[0];
  if (activeObject && activeObject.type === "image") {
    //选择图片
    const files = await selectFiles({ accept: "image/*", multiple: false });
    if (!files) return;
    // 转base64字符串
    const fileStr = await getImgStr(files[0]);
    // 字符串转El
    const imgEl = await insertImgFile(fileStr!);
    const width = activeObject.get("width");
    const height = activeObject.get("height");
    const scaleX = activeObject.get("scaleX");
    const scaleY = activeObject.get("scaleY");
    (activeObject as any).setSrc(imgEl.src, () => {
      activeObject.set("scaleX", (width! * scaleX!) / imgEl.width);
      activeObject.set("scaleY", (height! * scaleY!) / imgEl.height);
      canvas.renderAll();
    });
    imgEl.remove();
  }
};
</script>
