import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { RootState } from "stores/rootState";
import { StateStore } from "common/extend";
import { API_AUTH_SIGNIN, API_AUTH_SIGNUP, TypeRequest, handleApi } from "services/request";
import { Auths } from "./state";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<Auths, RootState>, "commit">;

export enum AuthAction {
  LOGIN = "LOGIN",
  SINGUP = "SINGUP",
}

export interface Actions {
  [AuthAction.LOGIN](context: AugmentedActionContext, payload: Auths): Promise<void>;
  [AuthAction.SINGUP](context: AugmentedActionContext, payload: Auths): Promise<void>;
}
export const actions: ActionTree<Auths, RootState> & Actions = {
  async [AuthAction.LOGIN]({ commit }: AugmentedActionContext, payload: Auths): Promise<void> {
    try {
      await handleApi(TypeRequest.POST, payload, StateStore.AUTH, commit, AuthAction.LOGIN, API_AUTH_SIGNIN);
      return;
    } catch (error) {
      return;
    }
  },
  async [AuthAction.SINGUP]({ commit }: AugmentedActionContext, payload: Auths): Promise<any> {
    try {
      const result = await handleApi(TypeRequest.POST, payload, StateStore.AUTH, commit, AuthAction.SINGUP, API_AUTH_SIGNUP);
      commit(AuthAction.SINGUP, result);
      return;
    } catch (error) {
      return;
    }
  },
};
