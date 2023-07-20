<template>
  <v-notifi :show="!!error" title="An error occurred!" @close="clearError"
    ><p>{{ error }}</p></v-notifi
  >
  <form @submit.prevent="submitSendMessage">
    <div class="form-control" v-for="item of dataInputForms" :key="item.id">
      <label :for="item.value">{{ item.label }}</label>
      <input :type="item.type" :id="item.value" v-model.trim="contact[item.value]" />
      <span v-if="isValid && contact[item.value] === ''" class="errors">***Please input {{ item.value }}</span>
    </div>
    <div class="actions">
      <v-button>Send Messages</v-button>
    </div>
  </form>
</template>

<script lang="ts">
import { inputForm, inputForms } from "common/extend";
import { GlobalsAction } from "stores/modules/globals/actions";
import { RequestsAction } from "stores/modules/requests/actions";
import { useStore } from "stores/store";
import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const dataInputForms = ref(inputForms);

    const contact = ref(inputForm);

    const isValid = ref(false);

    const resetData = () => {
      contact.value.email = "";
      contact.value.message = "";
    };

    watch(
      () => store.getters.getSuccess,
      (newVal) => {
        if (!newVal) return;
        if (newVal && newVal.key === RequestsAction.CONTACT_COACH) {
          resetData();
          router.replace("/coaches");
        }
      }
    );

    const error = computed(() => store.getters.getError);

    return { store, error, dataInputForms, contact, isValid, resetData };
  },

  methods: {
    submitSendMessage() {
      const { email, message } = this.contact;
      if (message === "" || email === "" || !email.includes("@")) {
        this.isValid = true;
        return;
      } else {
        this.isValid = false;
        this.store.dispatch(RequestsAction.CONTACT_COACH, {
          ...this.contact,
          coachId: this.$route.params.id,
        });
      }
    },
    clearError() {
      this.store.dispatch(GlobalsAction.SET_ERROR);
    },
  },
  unmounted() {
    this.store.dispatch(GlobalsAction.SET_SUCCESS, false);
    this.store.dispatch(GlobalsAction.SET_ERROR, null);
    this.resetData();
  },
});
</script>

<style lang="scss" scoped>
@import "../style/contact_coach.scss";
</style>
