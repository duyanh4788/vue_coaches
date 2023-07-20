<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const emailLink = "mailto:" + props.email;

    return { emailLink };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/request_item.scss";
</style>
