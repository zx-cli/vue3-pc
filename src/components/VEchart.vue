<template>
  <div class="v-echart" ref="root"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import elementResize from "element-resize-detector";

let root = $ref<any>(null);
let myChart = $ref<any>(null);
const props = defineProps({
  option: {
    type: Object,
    default: () => {},
  },
  height: {
    type: Number,
    default: 300,
  },
});

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  if (myChart) {
    echarts.dispose(root);
    myChart = null;
  }
});

function refresh() {
  nextTick(() => {
    myChart = echarts.getInstanceByDom(root);
    if (myChart == null) {
      // 如果不存在，就进行初始化
      myChart = echarts.init(root);
    }
    myChart.resize();
    myChart.setOption(props.option);
  });
}
function init() {
  nextTick(() => {
    myChart = markRaw(echarts.init(root));
    const elResize = elementResize({
      strategy: "scroll", // <- 推荐监听滚动，提升性能
      callOnAdd: true, // 添加侦听器时是否应调用,默认true
    });
    // 当元素尺寸发生改变是会触发此事件，刷新图表
    elResize.listenTo(root, () => {
      refresh();
    });
    myChart.setOption(props.option);
  });
}
</script>

<style scoped>
.v-echart {
  width: 100%;
  height: 100%;
}
</style>
