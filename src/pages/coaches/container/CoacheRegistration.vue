<template>
  <div>
    <section>
      <v-card>
        <h2>Register</h2>
        <coache-form @save-data="saveData"></coache-form>
      </v-card>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, watch } from "vue";
import CoacheForm from "../component/CoacheForm.vue";
import { Coache } from "stores/modules/coaches/state";
import { useStore } from "stores/store";
import { CoachesAction } from "stores/modules/coaches/actions";
import { GlobalsAction } from "stores/modules/globals/actions";
import { useRouter } from "vue-router";
import { inputReg } from "common/extend";
import { AppHelper } from "utils/helpers";

export default defineComponent({
  components: {
    CoacheForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const resetFrom = () => {
      AppHelper.clearEmtyInObject(inputReg);
    };

    const saveData = (data: Coache) => {
      store.dispatch(CoachesAction.REFGISTER_COACHE, data);
    };

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

    onUnmounted(() => {
      store.dispatch(GlobalsAction.SET_SUCCESS, null);
      store.dispatch(GlobalsAction.SET_ERROR, null);
    });
    return { store, saveData };
  },
});
</script>
