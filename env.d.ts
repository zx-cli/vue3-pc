/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module "wow.js";
declare module "element-resize-detector";
declare module "postcss-px-to-viewport-8-plugin";
declare module "vue-highcharts";
declare module "echarts-gl/charts";
declare module "echarts-gl/components";
declare module "autofit.js";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
