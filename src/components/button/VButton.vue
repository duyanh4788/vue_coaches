<template>
  <button v-if="!link" :class="mode"><slot></slot></button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    mode: {
      type: String,
      reuired: false,
      default: null,
    },
    link: {
      type: Boolean,
      reuired: true,
      default: false,
    },
    to: {
      type: String,
      reuired: false,
      default: "/",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./style/button.scss";
</style>
