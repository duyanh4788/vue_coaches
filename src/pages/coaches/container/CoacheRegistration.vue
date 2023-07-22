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
import { defineComponent, onUnmounted, provide, watch } from "vue";
import CoacheForm from "../component/CoacheForm.vue";
import { Coache } from "stores/modules/coaches/state";
import { useStore } from "stores/store";
import { CoachesAction } from "stores/modules/coaches/actions";
import { GlobalsAction } from "stores/modules/globals/actions";
import { useRouter } from "vue-router";
import { inputReg } from "common/extend";
import { AppHelper } from "utils/helpers";
import { NameRouter } from "routers/routers";
import { KeyEmit } from "common/keyemit";

export default defineComponent({
  components: {
    CoacheForm,
  },
  props: {
    idFireBase: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    if (props.idFireBase) {
      store.dispatch(CoachesAction.GET_COACHE_BY_ID, props.idFireBase);
    }

    provide("id-firebase", props.idFireBase);

    const router = useRouter();

    const resetFrom = () => {
      AppHelper.clearEmtyInObject(inputReg);
    };

    const saveData = (data: Coache) => {
      if (data.typeSubmit === KeyEmit.SAVE_DATA) {
        delete data.typeSubmit;
        store.dispatch(CoachesAction.REFGISTER_COACHE, data);
        return;
      }
      if (data.typeSubmit === KeyEmit.UPDATE_DATA) {
        delete data.typeSubmit;
        if (Object.keys(data).length === 1) {
          router.replace(NameRouter.COACHES);
          resetFrom();
          return;
        }
        store.dispatch(CoachesAction.UPDATE_DATA, data);
        return;
      }
    };

    watch(
      () => store.getters.getSuccess,
      (newVal) => {
        if (!newVal) return;
        if (newVal.key === CoachesAction.REFGISTER_COACHE || newVal.key === CoachesAction.UPDATE_DATA) {
          store.dispatch(CoachesAction.CLEAR_COACHE);
          router.replace(NameRouter.COACHES);
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
