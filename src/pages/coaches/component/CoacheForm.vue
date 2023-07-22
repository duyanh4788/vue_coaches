<template>
  <div>
    <div v-if="isLoading"><v-loading></v-loading></div>
    <form @submit.prevent="submitForm">
      <div v-for="item of renderInputRegs" :key="item.id" :class="['form-control', { invalid: isInvalid(item.value) }]">
        <label :for="item.value">{{ item.label }}</label>
        <textarea v-if="item.id === 'description'" :id="item.id" rows="5" v-model.trim="coache[item.value]"></textarea>
        <input v-else :type="item.type" :id="item.id" v-model.trim="coache[item.value]" />
        <span v-if="validCoache[item.value] !== '' && item.value !== 'rate'">{{ validCoache[item.value] }}</span>
        <span v-if="item.value === 'rate' && validCoache.validRate">{{ validCoache.validRate }}</span>
      </div>
      <div
        :class="[
          'form-control',
          {
            invalid: validCoache.validAreas && validCoache.validAreas !== '',
          },
        ]"
      >
        <h3>Area of Expertise</h3>
        <div v-for="item of listAreas" :key="item.id">
          <input type="checkbox" :id="item.id" :value="item.value" v-model="valueAreas" />
          <label :for="item.value">{{ item.label }}</label>
        </div>
        <span v-if="validCoache.validAreas !== ''">{{ validCoache.validAreas }}</span>
      </div>
      <v-button>Register</v-button>
    </form>
  </div>
</template>

<script lang="ts">
import { InputInterface, ListAreaExtend, inputReg } from "common/extend";
import { inputRegs, listAreasExtend } from "common/extend";
import { Coache } from "stores/modules/coaches/state";
import { SetupContext, computed, defineComponent, reactive, ref, watch } from "vue";
import { AppHelper } from "utils/helpers";
import { KeyEmit } from "common/keyemit";
import { useStore } from "stores/store";
import { onBeforeRouteLeave } from "vue-router";

export default defineComponent({
  emits: [KeyEmit.SAVE_DATA],
  setup(_, ctx: SetupContext) {
    const store = useStore();
    const isLoading = computed(() => store.getters.getLoading);
    const renderInputRegs = ref<InputInterface[]>(inputRegs);
    const listAreas = ref<ListAreaExtend[]>(listAreasExtend);
    const validCoache = reactive<Coache>({ ...inputReg });
    const coache = reactive<Coache>(inputReg);
    const isValidate = ref<boolean>(false);
    const valueAreas = ref<string[]>([]);

    const clearErr = (key: string) => {
      if (key === "rate" && coache[key]) {
        validCoache.validRate = "";
      }
      if (key === "validAreas" && valueAreas.value.length) {
        validCoache.validAreas = "";
      }
      if ((key !== "rate" && coache[key]) || (key !== "validAreas" && coache[key])) {
        validCoache[key] = "";
      }
    };

    const validateAreas = () => {
      if (!valueAreas.value?.length) {
        validCoache.validAreas = "At least one expertise must be selected";
        isValidate.value = true;
      } else {
        isValidate.value = false;
      }
    };

    const validateForm = () => {
      validateAreas();
      for (let key in coache) {
        if (key !== "rate" && coache[key] === "") {
          validCoache[key] = `***Please input ${key}`;
          isValidate.value = true;
        }
        if (key === "rate" && !coache.rate) {
          validCoache.validRate = `***Please input rate`;
          isValidate.value = true;
        }
      }
      const isCheckedCoache = AppHelper.hasEmptyValues(coache, valueAreas.value);
      if (isCheckedCoache) {
        isValidate.value = false;
        AppHelper.clearEmtyInObject(validCoache);
      }
    };

    const isInvalid = computed(() => (key: string) => {
      if (validCoache[key] !== "" && key !== "rate") {
        return true;
      }
      if (key === "rate" && validCoache.validRate) return true;
      return false;
    });

    const submitForm = () => {
      validateForm();
      if (isValidate.value) return;
      ctx.emit(KeyEmit.SAVE_DATA, { ...coache, areas: valueAreas.value });
    };

    watch([coache, valueAreas], (newVal, oldVal) => {
      const isCheckedCoache = AppHelper.hasEmptyValues(validCoache, valueAreas.value);
      if (isCheckedCoache) return;
      for (let key in newVal[0]) {
        clearErr(key);
      }
      if (oldVal[1].length && !newVal[1].length) {
        validateAreas();
      }
      if (newVal[1].length) {
        clearErr("validAreas");
      }
    });

    onBeforeRouteLeave(() => {
      const isCheckedCoache = AppHelper.validRouterLeave(coache);
      if (isCheckedCoache) {
        AppHelper.clearEmtyInObject(inputReg);
        return true;
      }
      const answer = window.confirm("Do you really want to leave? you have unsaved changes!");
      if (!answer) return false;
      AppHelper.clearEmtyInObject(inputReg);
    });

    return {
      valueAreas,
      isLoading,
      renderInputRegs,
      validCoache,
      listAreas,
      coache,
      isValidate,
      submitForm,
      validateForm,
      isInvalid,
      clearErr,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_form.scss";
</style>
