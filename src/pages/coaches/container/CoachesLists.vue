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
import { computed, defineComponent, onUnmounted, ref } from "vue";
import CoacheItem from "../component/CoacheItem.vue";
import CoacheFilter from "../component/CoacheFilter.vue";
import { Coache } from "stores/modules/coaches/state";
import { CoachesAction } from "stores/modules/coaches/actions";
import { GlobalsAction } from "stores/modules/globals/actions";
import { NameRouter } from "routers/routers";

export default defineComponent({
  components: {
    CoacheItem,
    CoacheFilter,
  },
  setup() {
    const store = useStore();
    store.dispatch(CoachesAction.GET_COACHES);
    const validateCoaches = computed<boolean>(() => store.getters.validateCoaches);
    const coaches = computed<Coache[]>(() => store.getters.getCoaches);

    const getCoaches = computed<Coache[]>(() => {
      return coaches.value.filter((item: Coache) => {
        if (activeFilter.value.frontend && item.areas?.length && item.areas.includes("frontend")) {
          return true;
        }
        if (activeFilter.value.backend && item.areas?.length && item.areas.includes("backend")) {
          return true;
        }
        if (activeFilter.value.career && item.areas?.length && item.areas.includes("career")) {
          return true;
        }
        return false;
      });
    });

    const activeFilter = ref({
      frontend: true,
      backend: true,
      career: true,
    });

    onUnmounted(() => {
      store.dispatch(GlobalsAction.SET_SUCCESS, false);
      store.dispatch(GlobalsAction.SET_ERROR, null);
    });

    const setFilter = (filter: any) => {
      activeFilter.value = { ...activeFilter.value, ...filter };
    };
    const refeshCoaches = () => {
      store.dispatch(CoachesAction.GET_COACHES, true);
    };
    const clearError = () => {
      store.dispatch(GlobalsAction.SET_ERROR);
    };

    return {
      store,
      validateCoaches,
      getCoaches,
      activeFilter,
      setFilter,
      refeshCoaches,
      clearError,
      NameRouter,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coaches.scss";
</style>
