<template>
  <v-notifi :show="!!error" title="An error occurred!" @close="clearError"
    ><p>{{ error }}</p></v-notifi
  >
  <section>
    <v-card>
      <h2>Register</h2>
      <coache-form @save-data="saveData" :reset-form="resetFrom"></coache-form>
    </v-card>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import CoacheForm from "../components/CoacheForm.vue";
import { Coache } from "stores/modules/coaches/state";
import { useStore } from "stores/store";
import { CoachesAction } from "stores/modules/coaches/actions";
import { GlobalsAction } from "stores/modules/globals/actions";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    CoacheForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const resetFrom = () => {};
    watch(
      () => store.getters.getSuccess,
      (newVal) => {
        if (!newVal) return;
        if (newVal && newVal.key === CoachesAction.REFGISTER_COACHE) {
          router.replace("/coaches");
          resetFrom();
        }
      }
    );
    const error = computed(() => store.getters.getError);
    return { store, error, resetFrom };
  },
  methods: {
    saveData(data: Coache) {
      this.store.dispatch(CoachesAction.REFGISTER_COACHE, data);
    },
    clearError() {
      this.store.dispatch(GlobalsAction.SET_ERROR);
    },
  },
  unmounted() {
    this.store.dispatch(GlobalsAction.SET_SUCCESS, null);
    this.store.dispatch(GlobalsAction.SET_ERROR, null);
  },
});
</script>
