<template>
  <v-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option" v-for="item of listAreas" :key="item.id">
      <input
        type="checkbox"
        :id="item.id"
        :checked="item.checked"
        @change="setFilter"
      />
      <label :for="item.value">{{ item.label }}</label>
    </span>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { listAreas } from "common/extend";

export default defineComponent({
  emits: ["change-filter"],
  data() {
    return {
      listAreas,
    };
  },
  methods: {
    setFilter(event: any) {
      const id = event.target.id;
      const isChecked = event.target.checked;
      const payload = { [id]: isChecked };
      this.$emit("change-filter", payload);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_filter.scss";
</style>
