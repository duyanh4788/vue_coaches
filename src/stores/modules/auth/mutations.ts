import { MutationTree } from "vuex";
import { AuthAction } from "./actions";
import { Auths } from "./state";

export type Mutations<S = Auths> = {
  [AuthAction.LOGIN](state: S, payload: Auths): any;
  [AuthAction.SINGUP](state: S, payload: Auths): any;
};

export const mutations: MutationTree<Auths> & Mutations = {
  [AuthAction.LOGIN](state, payload: Auths) {
    state.userInfor = payload as any;
  },
  [AuthAction.SINGUP](state, payload: Auths) {
    state.userInfor = payload as any;
  },
};
