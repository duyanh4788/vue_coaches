import { MutationTree } from "vuex";
import { AuthAction } from "./actions";
import { Auths, UserInfor } from "./state";

export type Mutations<S = Auths> = {
  [AuthAction.LOGIN](state: S, payload: UserInfor): void;
  [AuthAction.SINGUP](state: S, payload: UserInfor): void;
  [AuthAction.SET_IS_AUTH](state: S, payload: boolean): void;
  [AuthAction.CLEAR_USER_INFOR](state: S, payload: null): void;
};

export const mutations: MutationTree<Auths> & Mutations = {
  [AuthAction.LOGIN](state, payload: UserInfor) {
    state.userInfor = payload;
  },
  [AuthAction.SINGUP](state, payload: UserInfor) {
    state.userInfor = payload;
  },
  [AuthAction.SET_IS_AUTH](state, payload: boolean) {
    state.isAuth = payload;
  },
  [AuthAction.CLEAR_USER_INFOR](state, _) {
    state.userInfor = null;
  },
};
