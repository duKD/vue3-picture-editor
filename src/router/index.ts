import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
});
