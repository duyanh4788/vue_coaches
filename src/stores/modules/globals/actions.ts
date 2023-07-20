import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { Globals, SuccessResponse } from "./state";
import { RootState } from "stores/rootState";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<Globals, RootState>, "commit">;

export enum GlobalsAction {
  SET_LOADING = "SET_LOADING",
  SET_SUCCESS = "SET_SUCCESS",
  SET_ERROR = "SET_ERROR",
}

export interface Actions {
  [GlobalsAction.SET_LOADING](context: AugmentedActionContext, payload: boolean): void;
  [GlobalsAction.SET_SUCCESS](context: AugmentedActionContext, payload: SuccessResponse): void;
  [GlobalsAction.SET_ERROR](context: AugmentedActionContext, payload: any): void;
}
export const actions: ActionTree<Globals, RootState> & Actions = {
  [GlobalsAction.SET_LOADING]({ commit }: AugmentedActionContext, payload: boolean): void {
    commit(GlobalsAction.SET_LOADING, payload);
  },
  [GlobalsAction.SET_SUCCESS]({ commit }: AugmentedActionContext, payload: SuccessResponse): void {
    commit(GlobalsAction.SET_SUCCESS, payload);
  },
  [GlobalsAction.SET_ERROR]({ commit }: AugmentedActionContext, payload: any): void {
    commit(GlobalsAction.SET_ERROR, payload);
  },
};
