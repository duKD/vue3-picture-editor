import { useFileDialog, useBase64 } from "@vueuse/core";

/**
 * @description: 选择文件
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export function selectFiles(options: {
  accept?: string;
  capture?: string;
  multiple?: boolean;
}): Promise<FileList | null> {
  return new Promise((resolve) => {
    const { onChange, open } = useFileDialog(options);
    onChange((files) => {
      resolve(files);
    });
    open();
  });
}

/**
 * @description: 图片文件转字符串
 * @param {Blob|File} file 文件
 * @return {String}
 */
export function getImgStr(file: File | Blob): Promise<string> {
  return useBase64(file).promise.value;
}

/**
 * @description: 创建图片元素
 * @param { string  } str 图片地址或者base64图片
 * @return {Promise} element 图片元素
 */
export function insertImgFile(str: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const imgEl = document.createElement("img");
    imgEl.src = str;
    // 插入页面
    document.body.appendChild(imgEl);
    imgEl.onload = () => {
      resolve(imgEl);
    };
  });
}
