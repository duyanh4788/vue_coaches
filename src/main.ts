import { createApp } from "vue";
import "styles/index.scss";
import App from "./App.vue";
import routers from "./routers/routers";
import { store, key } from "stores/store";
import { listComponents, Components } from "components";

const app = createApp(App);

app.use(store, key);
app.use(routers);

listComponents.forEach((item: Components) => app.component(item.name, item.components));

app.mount("#app");
