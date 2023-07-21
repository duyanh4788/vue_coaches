import { ActionContext, ActionTree, GetterTree } from "vuex";
import { Mutations } from "./mutations";
import { Coache, Coaches } from "./state";
import { RootState } from "stores/rootState";
import { TypeRequest, handleApi } from "services/request";
import { StateStore } from "common/extend";
import { AppHelper } from "utils/helpers";

export enum CoachesAction {
  REFGISTER_COACHE = "REFGISTER_COACHE",
  GET_COACHES = "GET_COACHES",
  SET_TIMER = "SET_TIMER",
}

type AugmentedActionContext = {
  getters?: GetterTree<Coaches, RootState>;
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<Coaches, RootState>, "commit">;

interface Actions {
  [CoachesAction.REFGISTER_COACHE](context: AugmentedActionContext, payload: Coache): Promise<void>;
  [CoachesAction.GET_COACHES](context: AugmentedActionContext, payload: boolean): void;
  [CoachesAction.SET_TIMER](context: AugmentedActionContext, payload: number): void;
}

export const actions: ActionTree<Coaches, RootState> & Actions = {
  async [CoachesAction.REFGISTER_COACHE]({ commit }: AugmentedActionContext, data: Coache): Promise<void> {
    try {
      const payload = {
        ...data,
        id: AppHelper.randomeId(),
        hourlyRate: data.rate,
      };
      await handleApi(TypeRequest.POST, payload, StateStore.COACHES, commit, CoachesAction.REFGISTER_COACHE);
      return;
    } catch (error: any) {
      return;
    }
  },
  async [CoachesAction.GET_COACHES]({ getters, commit }: AugmentedActionContext, data: boolean = false): Promise<void> {
    try {
      if (!data && !getters.getLastGetList) return;
      const result = await handleApi(TypeRequest.GET, data, StateStore.COACHES, commit, CoachesAction.GET_COACHES);
      commit(CoachesAction.GET_COACHES, result);
      commit(CoachesAction.SET_TIMER, new Date().getTime());
    } catch (error: any) {
      return;
    }
  },
  [CoachesAction.SET_TIMER]({ commit }: AugmentedActionContext, payload: number): void {
    commit(CoachesAction.SET_TIMER, payload);
  },
};
