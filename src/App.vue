<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <v-notifi :show="!!error" title="An error occurred!" @close="clearError"
      ><p>{{ error }}</p></v-notifi
    >
    <div v-if="isLoading"><v-loading></v-loading></div>
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import TheHeader from "components/Layout/TheHeader.vue";
import { useStore } from "stores/store";
import { GlobalsAction } from "stores/modules/globals/actions";
import { useRouter } from "vue-router";
import { NameRouter } from "routers/routers";
import { AuthAction } from "stores/modules/auth/actions";

export default defineComponent({
  components: {
    TheHeader,
  },
  setup() {
    const store = useStore();
    store.dispatch(AuthAction.AUTO_LOGIN);
    const router = useRouter();
    const isLoading = computed(() => store.getters.getLoading);
    const error = computed(() => store.getters.getError);
    const isAuth = computed(() => store.getters.getAuth);

    watch(isAuth, (newVal) => {
      if (!newVal) {
        console.log(newVal);
        router.replace(NameRouter.AUTH);
      }
    });
    const clearError = () => {
      store.dispatch(GlobalsAction.SET_ERROR);
    };

    return { store, isLoading, error, clearError };
  },
});
</script>
