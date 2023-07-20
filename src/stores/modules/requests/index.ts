import { Module } from "vuex";
import { Requests, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { RootState } from "stores/rootState";

export const requests: Module<Requests, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
