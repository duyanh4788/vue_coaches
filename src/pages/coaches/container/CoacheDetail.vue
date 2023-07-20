<template>
  <section>
    <v-card>
      <h2>{{ fullName }}</h2>
      <h3>{{ coache?.hourlyRate }}/hourse</h3>
    </v-card>
  </section>
  <section>
    <v-card>
      <header>
        <h2>Interrested? Reach out now!</h2>
        <v-button link :to="contactLink">Contact</v-button>
      </header>
    </v-card>
  </section>
  <section>
    <v-card>
      <v-badge v-for="area in coache?.areas" :key="area" :type="area" :title="area"></v-badge>
      <p>{{ coache?.description }}</p>
    </v-card>
  </section>
  <router-view></router-view>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { Coache } from "stores/modules/coaches/state";
import { useStore } from "stores/store";
import { computed, defineComponent } from "vue";
import { GlobalsAction } from "stores/modules/globals/actions";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const coaches = computed<Coache[]>(() => store.getters.getCoaches);
    const coache = computed<Coache | null>(() => coaches.value.find((item: Coache) => item.id === Number(props.id)) || null);
    const router = useRouter();
    if (!coache.value) {
      router.go(-1);
    }
    const fullName = computed(() => coache.value?.firstName + " " + coache.value?.lastName);
    const contactLink = computed(() => `/coaches/${props.id}/contact`);
    return { store, coache, fullName, contactLink };
  },
  unmounted() {
    this.store.dispatch(GlobalsAction.SET_SUCCESS, false);
    this.store.dispatch(GlobalsAction.SET_ERROR, null);
  },
});
</script>
