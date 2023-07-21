<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Coach</router-link></h1>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isAuth">
          <v-button @click="logout">Logout</v-button>
        </li>
        <li v-else>
          <v-button>Login</v-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { NameRouter } from "routers/routers";
import { AuthAction } from "stores/modules/auth/actions";
import { useStore } from "stores/store";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const isAuth = computed(() => store.getters.getAuth);

    const logout = () => {
      store.dispatch(AuthAction.LOG_OUT);
      router.replace(NameRouter.AUTH);
    };
    return { isAuth, router, store, logout };
  },
});
</script>

<style lang="scss" scoped>
@import "./style/theheader.scss";
</style>
