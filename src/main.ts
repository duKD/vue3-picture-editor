import { createApp } from "vue";
import router from "./router";
import "./mock";
import App from "./App.vue";
import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "@/assets/style/global.less";
import "virtual:windi-utilities.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);

app.mount("#app");
