<template>
  <span class="badge" :class="type">
    {{ title }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      reuired: true,
      default: null,
    },
    type: {
      type: String,
      reuired: true,
      default: null,
    },
  },
  setup(props) {
    const text = computed(() => props.title.toUpperCase());
    return { text };
  },
});
</script>

<style lang="scss" scoped>
@import "./style/badge.scss";
</style>
