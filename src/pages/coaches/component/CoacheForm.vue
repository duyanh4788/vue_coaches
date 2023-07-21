<template>
  <form @submit.prevent="submitForm">
    <div v-for="item of renderInputRegs" :key="item.id" :class="['form-control', { invalid: isInvalid(item.value) }]">
      <label :for="item.value">{{ item.label }}</label>
      <textarea v-if="item.id === 'description'" :id="item.id" rows="5" v-model.trim="coache[item.value]" @blur="clearErr(item.value)"></textarea>
      <input v-else :type="item.type" :id="item.id" v-model.trim="coache[item.value]" @blur="clearErr(item.value)" />
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
        <input type="checkbox" :id="item.id" :value="item.value" v-model="coache.areas" @blur="clearErr('validAreas')" />
        <label :for="item.value">{{ item.label }}</label>
      </div>
      <span v-if="validCoache.validAreas !== ''">{{ validCoache.validAreas }}</span>
    </div>
    <v-button>Register</v-button>
  </form>
</template>

<script lang="ts">
import { InputInterface, ListAreaExtend, inputReg } from "common/extend";
import { inputRegs, listAreasExtend } from "common/extend";
import { Coache } from "stores/modules/coaches/state";
import { SetupContext, computed, defineComponent, ref } from "vue";
import { AppHelper } from "utils/helpers";
import { KeyEmit } from "common/keyemit";

export default defineComponent({
  emits: [KeyEmit.SAVE_DATA],
  setup(_, ctx: SetupContext) {
    const renderInputRegs = ref<InputInterface[]>(inputRegs);
    const listAreas = ref<ListAreaExtend[]>(listAreasExtend);
    const validCoache = ref<Coache>({ ...inputReg });
    const coache = ref<Coache>(inputReg);
    const isValidate = ref<boolean>(false);

    const clearErr = (key: string) => {
      if (key === "rate") {
        delete validCoache.value.validRate;
      }
      if (key === "validAreas") {
        delete validCoache.value.validAreas;
      }
      validCoache.value[key] = "";
    };

    const validateForm = () => {
      if (!coache.value.areas?.length) {
        const validAreas = "At least one expertise must be selected";
        validCoache.value = { ...validCoache.value, validAreas };
        isValidate.value = true;
      } else {
        delete validCoache.value.validAreas;
        isValidate.value = false;
      }
      for (let key in coache.value) {
        if (coache.value[key] === "" || !coache.value?.rate) {
          if (key !== "rate") {
            validCoache.value[key] = `***Please input ${key}`;
            isValidate.value = true;
          }
          if (key === "rate") {
            const validRate = `***Please input rate`;
            validCoache.value = { ...validCoache.value, validRate };
            isValidate.value = true;
          }
        }
      }
      const isCheckedCoache = AppHelper.hasEmptyValues(coache.value);
      if (isCheckedCoache) {
        isValidate.value = false;
        AppHelper.clearEmtyInObject(validCoache.value);
      }
    };

    const isInvalid = computed(() => (key: string) => {
      if (validCoache.value[key] !== "" && key !== "rate") {
        return true;
      }
      if (key === "rate" && validCoache.value.validRate) return true;
      return false;
    });

    const submitForm = () => {
      validateForm();
      if (isValidate.value) return;
      ctx.emit(KeyEmit.SAVE_DATA, coache.value);
    };

    return { renderInputRegs, validCoache, listAreas, coache, isValidate, submitForm, validateForm, isInvalid, clearErr };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_form.scss";
</style>