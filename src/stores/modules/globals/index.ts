import { Module } from "vuex";
import { Globals, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { RootState } from "stores/rootState";

export const globals: Module<Globals, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
