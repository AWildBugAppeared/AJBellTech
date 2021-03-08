/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */

import api from "@/api";
import { ApiRoutes } from "@/api-routes";
import { ITickerDataItem } from "@/dto-models/ticker-data-item";
import { GetterTree, MutationTree, ActionTree } from "vuex";

export class State {}

export const getters = {} as GetterTree<State, any>;

export const mutations = {} as MutationTree<State>;

export const actions = {
  async getTickerData({}) {
    const result = await api.get<ITickerDataItem[]>(ApiRoutes.ticker.getData);
    const tickerDataItems = [] as ITickerDataItem[];

    for (const [key, value] of Object.entries(result.data)) {
      let tickerDataItem = {} as ITickerDataItem;
      tickerDataItem = value;
      tickerDataItem.currency = key;
      tickerDataItems.push(tickerDataItem);
    }

    return tickerDataItems;
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
