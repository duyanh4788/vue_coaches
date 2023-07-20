import { GetterTree } from "vuex";
import { Globals } from "./state";
import { RootState } from "stores/rootState";

export type Getters = {
  getLoading(state: Globals): any;
  getSuccess(state: Globals): any;
  getError(state: Globals): any;
};

export const getters: GetterTree<Globals, RootState> & Getters = {
  getLoading: (state) => {
    return state.isLoading;
  },
  getSuccess: (state) => {
    return state.success;
  },
  getError: (state) => {
    return state.errors;
  },
};
