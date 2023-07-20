<template>
  <section>
    <v-card>
      <div class="not_found">
        <h2>404 Not Found</h2>
        <router-link to="/">back</router-link>
      </div>
    </v-card>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.not_found {
  text-align: center;
}
</style>
