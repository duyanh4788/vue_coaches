<template>
  <div>
    <div v-if="isLoading"><v-loading></v-loading></div>
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
  </div>
</template>

<script lang="ts">
import { InputInterface, ListAreaExtend, inputReg } from "common/extend";
import { inputRegs, listAreasExtend } from "common/extend";
import { Coache } from "stores/modules/coaches/state";
import { SetupContext, computed, defineComponent, ref } from "vue";
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
    const validCoache = ref<Coache>({ ...inputReg });
    const coache = ref<Coache>(inputReg);
    const isValidate = ref<boolean>(false);

    const clearErr = (key: string) => {
      if (key === "rate" && coache.value[key]) {
        delete validCoache.value.validRate;
      }
      if (key === "validAreas" && coache.value.areas && coache.value.areas.length) {
        delete validCoache.value.validAreas;
      }
      if ((key !== "rate" && coache.value[key]) || (key !== "validAreas" && coache.value[key])) {
        validCoache.value[key] = "";
      }
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
        if (key !== "rate" && coache.value[key] === "") {
          validCoache.value[key] = `***Please input ${key}`;
          isValidate.value = true;
        }
        if (key === "rate" && !coache.value?.rate) {
          const validRate = `***Please input rate`;
          validCoache.value = { ...validCoache.value, validRate };
          isValidate.value = true;
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

    onBeforeRouteLeave((_, _2) => {
      const answer = window.confirm("Do you really want to leave? you have unsaved changes!");
      if (!answer) return false;
    });

    return { isLoading, renderInputRegs, validCoache, listAreas, coache, isValidate, submitForm, validateForm, isInvalid, clearErr };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_form.scss";
</style>
