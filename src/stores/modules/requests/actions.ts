import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { RootState } from "stores/rootState";
import { Request, Requests } from "./state";
import { StateStore } from "common/extend";
import { TypeRequest, handleApi } from "services/request";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<Requests, RootState>, "commit">;

export enum RequestsAction {
  ADD_REQUEST = "ADD_REQUEST",
  CONTACT_COACH = "CONTACT_COACH",
  FIND_REQUEST_BY_COACHEID = "FIND_REQUEST_BY_COACHEID",
}

export interface Actions {
  [RequestsAction.CONTACT_COACH](context: AugmentedActionContext, payload: Request): Promise<void>;
  [RequestsAction.FIND_REQUEST_BY_COACHEID](context: AugmentedActionContext, payload: any): Promise<void>;
}
export const actions: ActionTree<Requests, RootState> & Actions = {
  async [RequestsAction.CONTACT_COACH]({ commit }: AugmentedActionContext, payload: Request): Promise<void> {
    try {
      await handleApi(TypeRequest.POST, payload, `${StateStore.REQUEST}/${payload.coachId}`, commit, RequestsAction.CONTACT_COACH);
      return;
    } catch (error) {
      return;
    }
  },
  async [RequestsAction.FIND_REQUEST_BY_COACHEID]({ commit }: AugmentedActionContext, payload: any): Promise<any> {
    try {
      const result = await handleApi(TypeRequest.GET, payload, `${StateStore.REQUEST}/${payload}`, commit, RequestsAction.FIND_REQUEST_BY_COACHEID);
      commit(RequestsAction.FIND_REQUEST_BY_COACHEID, result);
      return;
    } catch (error) {
      return;
    }
  },
};
