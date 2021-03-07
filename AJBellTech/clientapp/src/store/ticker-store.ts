import api from '@/api';
import { ApiRoutes } from '@/api-routes';
import { TickerData } from '@/dto-models/ticker-data';
import { GetterTree, MutationTree, ActionTree } from 'vuex';

export class State {}

export const getters = {} as GetterTree<State, any>

export const mutations = {} as MutationTree<State>;

export const actions = {
  async getTickerData({}, id: number) {
    const result = await api
      .get<TickerData>(ApiRoutes.ticker.getData);
    return result.data;
  },
} as ActionTree<State, any>;
  
  const tickerStoreModule = {
    namespaced: true,
    state: new State(),
    getters: getters,
    mutations: mutations,
    actions: actions,
  };
  
  export default tickerStoreModule;