import { MutationTree } from "vuex";
import { Coache, Coaches } from "./state";
import { CoachesAction } from "./actions";

export type Mutations<S = Coaches> = {
  [CoachesAction.GET_COACHES](state: S, payload: Coache[]): void;
  [CoachesAction.SET_TIMER](state: S, payload: number): void;
  [CoachesAction.GET_COACHE](state: S, payload: Coache): void;
  [CoachesAction.CLEAR_COACHE](state: S, payload: null): void;
};

export const mutations: MutationTree<Coaches> & Mutations = {
  [CoachesAction.GET_COACHES](state, payload: Coache[]) {
    state.coaches = payload;
  },
  [CoachesAction.SET_TIMER](state, payload: number) {
    state.lastGetList = payload;
  },
  [CoachesAction.GET_COACHE](state, payload: Coache) {
    state.coache = payload;
  },
  [CoachesAction.CLEAR_COACHE](state) {
    state.coache = null;
  },
};
