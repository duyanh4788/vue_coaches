import { createApp } from "vue";
import "styles/index.scss";
import App from "./App.vue";
import routers from "./routers/routers";
import { store, key } from "stores/store";
import VCard from "components/card/VCard.vue";
import VBadge from "components/badge/VBadge.vue";
import VButton from "components/button/VButton.vue";
import VLoading from "components/loading/VLoading.vue";
import VNotifi from "components/notifi/VNotifi.vue";

const app = createApp(App);

app.use(store, key);
app.use(routers);

app.component("v-card", VCard);
app.component("v-badge", VBadge);
app.component("v-button", VButton);
app.component("v-loading", VLoading);
app.component("v-notifi", VNotifi);

routers.isReady().then(() => {
  app.mount("#app");
});
