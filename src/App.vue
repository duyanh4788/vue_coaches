<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "components/Layout/TheHeader.vue";

export default defineComponent({
  components: {
    TheHeader,
  },
});
</script>
