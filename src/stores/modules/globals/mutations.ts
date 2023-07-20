import { MutationTree } from "vuex";
import { Globals, SuccessResponse } from "./state";
import { GlobalsAction } from "./actions";

export type Mutations<S = Globals> = {
  [GlobalsAction.SET_LOADING](state: S, payload: boolean): void;
  [GlobalsAction.SET_SUCCESS](state: S, payload: SuccessResponse): void;
  [GlobalsAction.SET_ERROR](state: S, payload: any): void;
};

export const mutations: MutationTree<Globals> & Mutations = {
  [GlobalsAction.SET_LOADING](state, payload: boolean) {
    state.isLoading = payload;
  },
  [GlobalsAction.SET_SUCCESS](state, payload: SuccessResponse) {
    state.success = payload;
  },
  [GlobalsAction.SET_ERROR](state, payload: any) {
    state.errors = payload;
  },
};
