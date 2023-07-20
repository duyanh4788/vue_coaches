import { MutationTree } from "vuex";
import { Requests } from "./state";
import { RequestsAction } from "./actions";

export type Mutations<S = Requests> = {
  [RequestsAction.FIND_REQUEST_BY_COACHEID](state: S, payload: any): any;
};

export const mutations: MutationTree<Requests> & Mutations = {
  [RequestsAction.FIND_REQUEST_BY_COACHEID](state, payload: any) {
    state.requests = payload;
  },
};
