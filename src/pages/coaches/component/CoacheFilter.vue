<template>
  <v-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option" v-for="item of listAreas" :key="item.id">
      <input type="checkbox" :id="item.id" :checked="item.checked" @change="setFilter" />
      <label :for="item.value">{{ item.label }}</label>
    </span>
  </v-card>
</template>

<script lang="ts">
import { SetupContext, defineComponent, ref } from "vue";
import { ListAreaExtend, listAreasExtend } from "common/extend";
import { KeyEmit } from "common/keyemit";

export default defineComponent({
  emits: [KeyEmit.CHANGE_FILTER],
  setup(_, ctx: SetupContext) {
    const listAreas = ref<ListAreaExtend[]>(listAreasExtend);
    const setFilter = (event: any) => {
      const id = event.target.id;
      const isChecked = event.target.checked;
      const payload = { [id]: isChecked };
      ctx.emit(KeyEmit.CHANGE_FILTER, payload);
    };
    return { listAreas, setFilter };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_filter.scss";
</style>
