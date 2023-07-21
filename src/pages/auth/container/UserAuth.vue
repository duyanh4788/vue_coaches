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
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "stores/store";
import { AuthAction } from "stores/modules/auth/actions";
import { GlobalsAction } from "stores/modules/globals/actions";
import { UserInfor } from "stores/modules/auth/state";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const userInfor = computed<UserInfor>(() => store.getters.getUserInfor);

    watch(userInfor, (newVal) => {
      if (newVal) {
        router.replace("/coaches");
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
    return { auth, store, typeAuth, typeChange, mode, userInfor };
  },
  methods: {
    submitLogin() {
      const { email, password } = this.auth;
      if (password === "" || email === "" || !email.includes("@")) {
        this.auth.isValid = true;
        return;
      } else {
        this.auth.isValid = false;
        const payload = { email: this.auth.email, password: this.auth.password, returnSecureToken: true };
        if (this.mode === "login") {
          this.store.dispatch(AuthAction.LOGIN, payload);
        }
        if (this.mode === "signup") {
          this.store.dispatch(AuthAction.SINGUP, payload);
        }
      }
    },
    changeType(value: string) {
      this.mode = value === "signup" && this.mode === "signup" ? "login" : "signup";
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
@import "../style/user_auth.scss";
</style>
