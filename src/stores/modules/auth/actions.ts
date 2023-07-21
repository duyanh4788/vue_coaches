import { ActionContext, ActionTree, Dispatch } from "vuex";
import { Mutations } from "./mutations";
import { RootState } from "stores/rootState";
import { StateStore } from "common/extend";
import { API_AUTH_SIGNIN, API_AUTH_SIGNUP, TypeRequest, handleApi } from "services/request";
import { Auths, UserInfor } from "./state";
import { KeyLocal, TypeLocal, localStorageServices } from "services/localstorage";
import { AppHelper } from "utils/helpers";

type AugmentedActionContext = {
  dispatch?: Dispatch;
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<Auths, RootState>, "commit">;

export enum AuthAction {
  LOGIN = "LOGIN",
  SINGUP = "SINGUP",
  LOG_OUT = "LOG_OUT",
  AUTO_LOGIN = "AUTO_LOGIN",
  SET_IS_AUTH = "SET_IS_AUTH",
  CLEAR_USER_INFOR = "CLEAR_USER_INFOR",
}

export interface Actions {
  [AuthAction.LOGIN](context: AugmentedActionContext, payload: UserInfor): Promise<void>;
  [AuthAction.SINGUP](context: AugmentedActionContext, payload: UserInfor): Promise<void>;
  [AuthAction.LOG_OUT](context: AugmentedActionContext): void;
  [AuthAction.AUTO_LOGIN](context: AugmentedActionContext): void;
}
let timer: NodeJS.Timeout;

export const actions: ActionTree<Auths, RootState> & Actions = {
  async [AuthAction.LOGIN]({ commit }: AugmentedActionContext, payload: UserInfor): Promise<void> {
    try {
      const data = await handleApi(TypeRequest.POST, payload, StateStore.AUTH, commit, AuthAction.LOGIN, API_AUTH_SIGNIN);
      const result = { ...data, expiresIn: AppHelper.configExpiresInFierBase(data.expiresIn) };
      localStorageServices(TypeLocal.SET, KeyLocal.USER_INFOR, result);
      commit(AuthAction.LOGIN, data);
      return;
    } catch (error) {
      return;
    }
  },
  async [AuthAction.SINGUP]({ commit }: AugmentedActionContext, payload: UserInfor): Promise<any> {
    try {
      const result = await handleApi(TypeRequest.POST, payload, StateStore.AUTH, commit, AuthAction.SINGUP, API_AUTH_SIGNUP);
      commit(AuthAction.SINGUP, result);
      return;
    } catch (error) {
      return;
    }
  },
  [AuthAction.LOG_OUT]({ commit }: AugmentedActionContext): void {
    localStorageServices(TypeLocal.REMOVE, KeyLocal.USER_INFOR);
    commit(AuthAction.SET_IS_AUTH, false);
    commit(AuthAction.CLEAR_USER_INFOR, null);
    clearTimeout(timer);
  },
  [AuthAction.AUTO_LOGIN]({ dispatch }: AugmentedActionContext): void {
    const local = localStorageServices(TypeLocal.GET, KeyLocal.USER_INFOR);
    if (!local) {
      dispatch(AuthAction.LOG_OUT);
      return;
    }
    const expiresIn = +local.expiresIn - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(function () {
      dispatch(AuthAction.LOG_OUT);
    }, expiresIn);
  },
};
