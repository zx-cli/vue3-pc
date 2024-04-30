import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "@/views/home/index.vue";
import ScreenLayout from "@/layout/sceen.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ScreenLayout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          component: Home,
          meta: {
            name: "首页",
          },
        },
      ],
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/error-page/404.vue"),
    },
  ],
});

export default router;
