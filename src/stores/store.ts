import { createStore, useStore as baseUseStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { RootState } from "./rootState";
import { coaches } from "./modules/coaches";
import { requests } from "./modules/requests";
import { globals } from "./modules/globals";
import { auths } from "./modules/auth";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    coaches,
    requests,
    globals,
    auths,
  },
});

export function useStore() {
  return baseUseStore(key);
}
