import VCard from "./card/VCard.vue";
import VBadge from "./badge/VBadge.vue";
import VButton from "./button/VButton.vue";
import VLoading from "./loading/VLoading.vue";
import VNotifi from "./notifi/VNotifi.vue";
import { Component } from "vue";

export interface Components {
  key: number;
  name: string;
  components: Component;
}
export const listComponents: Components[] = [
  { key: 1, name: "v-card", components: VCard },
  { key: 2, name: "v-badge", components: VBadge },
  { key: 3, name: "v-button", components: VButton },
  { key: 4, name: "v-loading", components: VLoading },
  { key: 5, name: "v-notifi", components: VNotifi },
];
