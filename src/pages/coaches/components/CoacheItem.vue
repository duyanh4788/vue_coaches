<template>
  <li>
    <h3>{{ fullName }} | {{ coache?.id }}</h3>
    <h4>{{ coache.hourlyRate }}/hour</h4>
    <div>
      <v-badge v-for="area in coache.areas" :key="area" :type="area" :title="area"></v-badge>
    </div>
    <hr />
    <div class="actions">
      <v-button link :to="`/requests/${coache.id}`">Request</v-button>
      <v-button mode="outline" link :to="contactLink"> Contact </v-button>
      <v-button link :to="detailLink">View Detail </v-button>
    </div>
  </li>
</template>

<script lang="ts">
import { Coache } from "stores/modules/coaches/state";
import { PropType, computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    coache: {
      type: Object as PropType<Coache>,
      required: true,
    },
  },
  setup(props) {
    const { coache } = toRefs(props);
    const fullName = computed(() => coache.value.firstName + " " + coache.value.lastName);
    const detailLink = computed(() => "coaches/" + coache.value.id);
    const contactLink = computed(() => "coaches/" + coache.value.id + "/contact");
    return {
      fullName,
      detailLink: detailLink.value,
      contactLink: contactLink.value,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/coache_item.scss";
</style>
