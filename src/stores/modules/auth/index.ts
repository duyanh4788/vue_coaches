import { Module } from "vuex";
import { Auths, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { RootState } from "stores/rootState";

export const auths: Module<Auths, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
