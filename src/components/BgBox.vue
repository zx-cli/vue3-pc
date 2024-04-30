<template>
  <div
    class="background-component"
    :style="{ backgroundImage: `url(${backgroundImage})`, padding }"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  backgroundImage: String,
  width: String,
  height: String,
  padding: String,
});
</script>

<style scoped lang="scss">
.background-component {
  // flex-shrink: 0;
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  background-size: 100% 100%;
  box-sizing: border-box;
}
</style>
