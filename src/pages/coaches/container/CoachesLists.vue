<template>
  <div>
    <section><coache-filter @change-filter="setFilter"></coache-filter></section>
    <section>
      <v-card>
        <div class="controls">
          <v-button mode="outline" @click="refeshCoaches">Refresh</v-button>
          <v-button link to="/register">Register a Coach </v-button>
        </div>
        <ul v-if="validateCoaches">
          <coache-item v-for="item of getCoaches" :key="item.id" :coache="item"></coache-item>
        </ul>
        <h3 v-else>No Data</h3>
      </v-card>
    </section>
  </div>
</template>

<script lang="ts">
import { useStore } from "stores/store";
import { defineComponent } from "vue";
import CoacheItem from "../components/CoacheItem.vue";
import CoacheFilter from "../components/CoacheFilter.vue";
import { Coache } from "stores/modules/coaches/state";
import { CoachesAction } from "stores/modules/coaches/actions";
import { GlobalsAction } from "stores/modules/globals/actions";

export default defineComponent({
  components: {
    CoacheItem,
    CoacheFilter,
  },
  setup() {
    const store = useStore();
    store.dispatch(CoachesAction.GET_COACHES);
    return {
      store,
    };
  },
  computed: {
    getCoaches() {
      const coaches = this.store.getters.getCoaches;
      return coaches.filter((item: Coache) => {
        if (this.activeFilter.frontend && item.areas?.length && item.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilter.backend && item.areas?.length && item.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilter.career && item.areas?.length && item.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    validateCoaches() {
      return this.store.getters.validateCoaches;
    },
  },
  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(filter: any) {
      this.activeFilter = { ...this.activeFilter, ...filter };
    },
    refeshCoaches() {
      this.store.dispatch(CoachesAction.GET_COACHES, true);
    },
    clearError() {
      this.store.dispatch(GlobalsAction.SET_ERROR);
    },
  },
  unmounted() {
    this.store.dispatch(GlobalsAction.SET_SUCCESS, false);
    this.store.dispatch(GlobalsAction.SET_ERROR, null);
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coaches.scss";
</style>
