import { MutationTree } from "vuex";
import { Coache, Coaches } from "./state";
import { CoachesAction } from "./actions";

export type Mutations<S = Coaches> = {
  [CoachesAction.GET_COACHES](state: S, payload: Coache[]): void;
  [CoachesAction.SET_TIMER](state: S, payload: number): void;
};

export const mutations: MutationTree<Coaches> & Mutations = {
  [CoachesAction.GET_COACHES](state, payload: Coache[]) {
    state.coaches = payload;
  },
  [CoachesAction.SET_TIMER](state, payload: number) {
    state.lastGetList = payload;
  },
};
