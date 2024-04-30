<script setup lang="ts">
import { RouterView } from "vue-router";
import autofit from "autofit.js";
onMounted(() => {
  autofit.init({
    designHeight: 1080,
    designWidth: 1920,
    renderDom: "#app",
    resize: true,
  });
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
