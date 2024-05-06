import { Ref } from "vue";
import { getInject } from "./useContext";
import { Editor } from "@/core";

export const editorKey = Symbol("editor");

export function useEditor() {
  return getInject<Editor>(editorKey);
}
