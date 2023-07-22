<template>
  <li>
    <h3>
      {{ fullName }} | {{ coache?.id }}
      <v-icon :icon="'fa-solid fa-trash'" :color="'spacial'" @click="deleteCoache"></v-icon>
      <v-icon :icon="'fa-solid fa-edit'" :color="'green'" @click="updateCoche"></v-icon>
    </h3>

    <h4>{{ coache.hourlyRate }}/hour</h4>
    <div>
      <v-badge v-for="area in coache.areas" :key="area" :type="area" :title="area"></v-badge>
    </div>
    <hr />
    <div class="actions">
      <v-button link :to="`/request/${coache.id}`">Request</v-button>
      <v-button mode="outline" link :to="contactLink"> Contact </v-button>
      <v-button link :to="detailLink">View Detail </v-button>
    </div>
  </li>
</template>

<script lang="ts">
import { Coache } from "stores/modules/coaches/state";
import { useStore } from "stores/store";
import { PropType, computed, defineComponent, toRefs } from "vue";
import { CoachesAction } from "stores/modules/coaches/actions";
import { useRouter } from "vue-router";
import { NameRouter } from "routers/routers";
interface Props {
  coache: Coache;
}

export default defineComponent({
  props: {
    coache: {
      type: Object as PropType<Coache>,
      required: true,
    },
  },
  setup(props: Props) {
    const store = useStore();
    const router = useRouter();
    const { coache } = toRefs(props);
    const fullName = computed(() => coache.value.firstName + " " + coache.value.lastName);
    const detailLink = computed(() => "coaches/" + coache.value.id);
    const contactLink = computed(() => "coaches/" + coache.value.id + "/contact");

    const deleteCoache = () => {
      store.dispatch(CoachesAction.DELETE_COACHE, coache.value.idFireBase);
    };

    const updateCoche = () => {
      router.replace(`${NameRouter.REGISTER}/${coache.value.idFireBase}`);
    };

    return {
      fullName,
      detailLink,
      contactLink,
      deleteCoache,
      updateCoche,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_item.scss";
</style>
