import { GetterTree } from "vuex";
import { RootState } from "stores/rootState";
import { Request, Requests } from "./state";

export type Getters = {
  getRequest(state: Requests): Request[];
};

export const getters: GetterTree<Requests, RootState> & Getters = {
  getRequest: (state) => {
    return state.requests;
  },
};
