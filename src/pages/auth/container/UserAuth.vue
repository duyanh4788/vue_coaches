<template>
  <v-card>
    <form @submit.prevent="submitLogin">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="auth.email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="text" id="password" v-model="auth.password" />
      </div>
      <p class="errors" v-if="auth.isValid">Please enter a valid email or password!</p>
      <v-button>{{ typeAuth }}</v-button>
      <v-button type="button" mode="flat" @click="changeType('signup')">{{ typeChange }}</v-button>
    </form>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref, watch } from "vue";
import { useStore } from "stores/store";
import { AuthAction } from "stores/modules/auth/actions";
import { GlobalsAction } from "stores/modules/globals/actions";
import { UserInfor } from "stores/modules/auth/state";
import { useRouter } from "vue-router";
import { NameRouter } from "routers/routers";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const userInfor = computed<UserInfor>(() => store.getters.getUserInfor);

    watch(userInfor, (newVal) => {
      if (newVal) {
        router.replace(NameRouter.COACHES);
      }
    });

    const auth = ref({
      email: "",
      password: "",
      isValid: false,
    });
    const mode = ref<string>("login");
    const typeAuth = computed(() => {
      return mode.value === "login" ? "Login" : "SignUp";
    });
    const typeChange = computed(() => {
      return mode.value === "signup" ? "Login instead" : "Signup instead";
    });

    onUnmounted(() => {
      store.dispatch(GlobalsAction.SET_SUCCESS, false);
      store.dispatch(GlobalsAction.SET_ERROR, null);
    });

    const submitLogin = () => {
      const { email, password } = auth.value;
      if (password === "" || email === "" || !email.includes("@")) {
        auth.value.isValid = true;
        return;
      } else {
        auth.value.isValid = false;
        const payload = { email: auth.value.email, password: auth.value.password, returnSecureToken: true };
        if (mode.value === "login") {
          store.dispatch(AuthAction.LOGIN, payload);
        }
        if (mode.value === "signup") {
          store.dispatch(AuthAction.SINGUP, payload);
        }
      }
    };

    const changeType = (value: string) => {
      mode.value = value === "signup" && mode.value === "signup" ? "login" : "signup";
    };

    const clearError = () => {
      store.dispatch(GlobalsAction.SET_ERROR);
    };

    return { auth, store, typeAuth, typeChange, mode, userInfor, submitLogin, changeType, clearError };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/user_auth.scss";
</style>
