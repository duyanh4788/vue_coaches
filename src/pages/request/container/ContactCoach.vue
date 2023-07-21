<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { inputForm, inputForms } from "common/extend";
import { GlobalsAction } from "stores/modules/globals/actions";
import { RequestsAction } from "stores/modules/requests/actions";
import { useStore } from "stores/store";
import { computed, defineComponent, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

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

    onUnmounted(() => {
      store.dispatch(GlobalsAction.SET_SUCCESS, false);
      store.dispatch(GlobalsAction.SET_ERROR, null);
      resetData();
    });

    const submitSendMessage = () => {
      const { email, message } = contact.value;
      if (message === "" || email === "" || !email.includes("@")) {
        isValid.value = true;
        store.dispatch(GlobalsAction.SET_ERROR, "please input available!");
        return;
      } else {
        isValid.value = false;
        store.dispatch(RequestsAction.CONTACT_COACH, {
          ...contact,
          coachId: route.params.id,
        });
      }
    };

    const clearError = () => {
      store.dispatch(GlobalsAction.SET_ERROR);
    };

    return { store, error, dataInputForms, contact, isValid, resetData, submitSendMessage, clearError };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/contact_coach.scss";
</style>
