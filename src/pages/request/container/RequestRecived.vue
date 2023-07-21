<template>
  <div>
    <section>
      <v-card>
        <header>
          <h2>Request Received</h2>
        </header>
        <ul v-if="requests.length">
          <request-item v-for="item of requests" :key="item.id" :email="item.email" :message="item.message">{{ item.email }}</request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </v-card>
    </section>
  </div>
</template>

<script lang="ts">
import { Request } from "stores/modules/requests/state";
import { useStore } from "stores/store";
import { computed, defineComponent, onUnmounted } from "vue";
import RequestItem from "../component/RequestItem.vue";
import { RequestsAction } from "stores/modules/requests/actions";
import { GlobalsAction } from "stores/modules/globals/actions";

export default defineComponent({
  props: {
    coacheId: {
      type: String,
      required: true,
    },
  },
  components: {
    RequestItem,
  },
  setup(props) {
    const store = useStore();
    store.dispatch(RequestsAction.FIND_REQUEST_BY_COACHEID, props.coacheId);
    const requests = computed<Request[]>(() => store.getters.getRequest);

    onUnmounted(() => {
      store.dispatch(GlobalsAction.SET_SUCCESS, false);
      store.dispatch(GlobalsAction.SET_ERROR, null);
    });
    return {
      store,
      requests,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/request_recived.scss";
</style>
