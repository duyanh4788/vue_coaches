import { ActionContext, ActionTree, Dispatch, GetterTree } from "vuex";
import { Mutations } from "./mutations";
import { Coache, Coaches } from "./state";
import { RootState } from "stores/rootState";
import { TypeRequest, handleApi } from "services/request";
import { StateStore } from "common/extend";
import { AppHelper } from "utils/helpers";

export enum CoachesAction {
  REFGISTER_COACHE = "REFGISTER_COACHE",
  GET_COACHES = "GET_COACHES",
  GET_COACHE = "GET_COACHE",
  GET_COACHE_BY_ID = "GET_COACHE_BY_ID",
  SET_TIMER = "SET_TIMER",
  DELETE_COACHE = "DELETE_COACHE",
  UPDATE_DATA = "UPDATE_DATA",
  CLEAR_COACHE = "CLEAR_COACHE",
}

type AugmentedActionContext = {
  dispatch?: Dispatch;
  getters?: GetterTree<Coaches, RootState>;
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<Coaches, RootState>, "commit">;

interface Actions {
  [CoachesAction.REFGISTER_COACHE](context: AugmentedActionContext, payload: Coache): Promise<void>;
  [CoachesAction.GET_COACHES](context: AugmentedActionContext, payload: boolean): void;
  [CoachesAction.GET_COACHE](context: AugmentedActionContext, payload: Coache): void;
  [CoachesAction.GET_COACHE_BY_ID](context: AugmentedActionContext, payload: string): Promise<void>;
  [CoachesAction.SET_TIMER](context: AugmentedActionContext, payload: number): void;
  [CoachesAction.DELETE_COACHE](context: AugmentedActionContext, payload: number): Promise<void>;
  [CoachesAction.UPDATE_DATA](context: AugmentedActionContext, payload: Coache): Promise<void>;
  [CoachesAction.CLEAR_COACHE](context: AugmentedActionContext): void;
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
      commit(CoachesAction.SET_TIMER, 0);
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
  async [CoachesAction.DELETE_COACHE]({ getters, commit }: AugmentedActionContext, payload: number): Promise<void> {
    try {
      await handleApi(TypeRequest.DELETE, payload, `${StateStore.COACHES}/${payload}`, commit, CoachesAction.DELETE_COACHE);
      let listCoache: Coache[] = getters.getCoaches;
      listCoache = listCoache.filter((item) => item.idFireBase !== payload);
      commit(CoachesAction.GET_COACHES, listCoache);
    } catch (error: any) {
      return;
    }
  },
  async [CoachesAction.GET_COACHE_BY_ID]({ commit }: AugmentedActionContext, payload: string): Promise<void> {
    try {
      const result = await handleApi(TypeRequest.GET, null, `${StateStore.COACHES}/${payload}`, commit, CoachesAction.GET_COACHE);
      commit(CoachesAction.GET_COACHE, result);
    } catch (error: any) {
      return;
    }
  },
  async [CoachesAction.UPDATE_DATA]({ dispatch, commit }: AugmentedActionContext, payload: Coache): Promise<void> {
    try {
      const payloadCheck = { ...payload };
      delete payloadCheck.idFireBase;
      await handleApi(TypeRequest.PATCH, payloadCheck, `${StateStore.COACHES}/${payload.idFireBase}`, commit, CoachesAction.UPDATE_DATA);
      await dispatch(CoachesAction.GET_COACHES, true);
    } catch (error: any) {
      return;
    }
  },
  [CoachesAction.SET_TIMER]({ commit }: AugmentedActionContext, payload: number): void {
    commit(CoachesAction.SET_TIMER, payload);
  },
  [CoachesAction.GET_COACHE]({ commit }: AugmentedActionContext, payload: Coache): void {
    commit(CoachesAction.GET_COACHE, payload);
  },
  [CoachesAction.CLEAR_COACHE]({ commit }: AugmentedActionContext): void {
    commit(CoachesAction.CLEAR_COACHE, null);
  },
};
