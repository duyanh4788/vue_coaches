import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { Coaches, state } from "./state";
import { RootState } from "stores/rootState";
import { actions } from "./actions";

export const coaches: Module<Coaches, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
