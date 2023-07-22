import { GetterTree } from "vuex";
import { Coache, Coaches } from "./state";
import { RootState } from "stores/rootState";

export type Getters = {
  getCoaches(state: Coaches): Coache[];
  getCoache(state: Coaches): Coache | null;
  validateCoaches(state: Coaches): boolean;
  getLastGetList(state: Coaches): boolean;
};

export const getters: GetterTree<Coaches, RootState> & Getters = {
  getCoaches: (state) => {
    return state.coaches;
  },
  getCoache: (state) => {
    return state.coache;
  },
  validateCoaches: (state) => {
    return state.coaches && state.coaches.length > 0;
  },
  getLastGetList: (state) => {
    if (!state.lastGetList) return true;
    return (new Date().getTime() - state.lastGetList) / 1000 > 60;
  },
};
