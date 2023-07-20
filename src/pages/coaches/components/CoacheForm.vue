<template>
  <form @submit.prevent="submitForm">
    <div v-for="item of inputRegs" :key="item.id" :class="['form-control', { invalid: isInvalid(item.value) }]">
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
import { inputReg } from "common/extend";
import { inputRegs, listAreas } from "common/extend";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    resetForm: Function,
  },
  emits: ["save-data"],
  data() {
    return {
      inputRegs,
      listAreas,
      coache: inputReg,
      validCoache: { ...inputReg },
      isValidate: false,
    };
  },
  methods: {
    clearErr(key: string) {
      if (key === "rate") {
        delete this.validCoache.validRate;
      }
      if (key === "validAreas") {
        delete this.validCoache.validAreas;
      }
      this.validCoache[key] = "";
    },
    validateForm() {
      if (!this.coache.areas?.length) {
        const validAreas = "At least one expertise must be selected";
        this.validCoache = { ...this.validCoache, validAreas };
        this.isValidate = true;
      } else {
        delete this.validCoache.validAreas;
        this.isValidate = false;
      }
      for (let key in this.coache) {
        if (key !== "rate" && this.coache[key] === "") {
          this.validCoache[key] = `***Please input ${key}`;
          this.isValidate = true;
        }
        if (key === "rate" && !this.coache?.rate) {
          const validRate = `***Please input rate`;
          this.validCoache = { ...this.validCoache, validRate };
          this.isValidate = true;
        }
        if (key !== "rate" && this.coache[key] !== "") {
          this.validCoache[key] = "";
        }
        if (this.coache[key] !== "" && this.coache[key] && this.validCoache[key] === "") {
          this.isValidate = false;
        }
      }
    },

    submitForm() {
      this.validateForm();
      if (this.isValidate) return;
      this.$emit("save-data", this.coache);
    },
  },
  computed: {
    isInvalid() {
      return (key: string) => {
        if (this.validCoache[key] !== "" && key !== "rate") {
          return true;
        }
        if (key === "rate" && this.validCoache.validRate) return true;
        return false;
      };
    },
    resetForm() {
      for (let key in inputReg) {
        inputReg[key] = "";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_form.scss";
</style>
