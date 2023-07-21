import { GetterTree } from "vuex";
import { RootState } from "stores/rootState";
import { Auths, UserInfor } from "./state";
import { KeyLocal, TypeLocal, localStorageServices } from "services/localstorage";
import { AppHelper } from "utils/helpers";

export type Getters = {
  getUserInfor(state: Auths): UserInfor;
  getAuth(state: Auths): boolean;
};

export const getters: GetterTree<Auths, RootState> & Getters = {
  getUserInfor(state: Auths) {
    return state.userInfor as UserInfor;
  },
  getAuth(state: Auths): boolean {
    const local = localStorageServices(TypeLocal.GET, KeyLocal.USER_INFOR);
    const validExpiresIn = AppHelper.validateExpiresInFierBase(local?.expiresIn);
    const isChecked = state.userInfor ? true : !!local;
    state.isAuth = validExpiresIn && isChecked ? true : false;
    return state.isAuth;
  },
};
