import { type App, defineAsyncComponent } from "vue";
import router from "@/router";
import { extractComponentName } from "@/utils";

//* 样式
import "animate.css";
import "normalize.css";
import "element-plus/theme-chalk/src/index.scss";
import "@/assets/styles/base.scss";

//* 脚本
import "virtual:svg-icons-register";
import "@/utils/permission";
import "dayjs/locale/zh-cn";

//* pina
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

//* element-plus
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

//* echart
import china from "@/assets/json/china.json";
import * as echarts from "echarts";
// import "echarts-gl"
echarts.registerMap("china", china as any);

//* wow
// import WOW from "wow.js";

// new WOW({
//   boxClass: "wow", // 类名，在用户滚动时显示隐藏的框。
//   animateClass: "animate__animated", // 触发CSS动画的类名称
//   offset: 300, // 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并到达此距离时，隐藏的框会显示出来。
//   mobile: false, // 在移动设备上打开/关闭WOW.js。
//   live: true, // 在页面上同时检查新的WOW元素。
// }).init();

export default {
  install(app: App) {
    app.use(pinia);
    app.use(router);
    app.use(ElementPlus, {
      locale: zhCn,
    });

    // 挂载全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    const requireModules = import.meta.glob("@/components/*.vue");
    for (const path in requireModules) {
      const name = extractComponentName(path);
      const modulesConent: any = requireModules[path];
      if (name) {
        app.component(name, defineAsyncComponent(modulesConent));
      }
    }
  },
};
