import { MutationTree } from "vuex";
import { Request, Requests } from "./state";
import { RequestsAction } from "./actions";

export type Mutations<S = Requests> = {
  [RequestsAction.ADD_REQUEST](state: S, payload: Request): void;
  [RequestsAction.FIND_REQUEST_BY_COACHEID](state: S, payload: any): any;
};

export const mutations: MutationTree<Requests> & Mutations = {
  [RequestsAction.ADD_REQUEST](_, _2): void {},
  [RequestsAction.FIND_REQUEST_BY_COACHEID](state, payload: any) {
    state.requests = payload;
  },
};
