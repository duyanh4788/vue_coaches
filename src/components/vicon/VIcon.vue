<template>
  <font-awe-some-icon :icon="icon" :class="color"><slot></slot></font-awe-some-icon>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      reuired: true,
    },
    color: {
      type: String,
      reuired: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./style/icon.scss";
</style>
