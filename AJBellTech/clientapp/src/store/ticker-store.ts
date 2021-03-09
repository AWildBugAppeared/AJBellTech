/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */

import api from "@/api";
import { ApiRoutes } from "@/api-routes";
import { CurrencyConversionQueryModel } from "@/query-models/currency-conversion-query-model";
import { ITickerDataItem } from "@/dto-models/ticker-data-item";
import { GetterTree, MutationTree, ActionTree } from "vuex";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const querystring = require('querystring');

export class State {
  validCurrenciesForBtcConversion = [] as string[] | null;
}

export const getters = {} as GetterTree<State, any>;

export const mutations = {
  setValidCurrenciesForBtcConversion(state, validCurrencies: string[]) {
    state.validCurrenciesForBtcConversion = validCurrencies;
  }
} as MutationTree<State>;

export const actions = {
  async getBtcAmountFromCurrency({}, payload: CurrencyConversionQueryModel ) {
    const result = await api.get<number>(`${ApiRoutes.ticker.getBtcAmountFromCurrency}?${querystring.stringify(payload)}`);
    return result.data;
  },

  async getTickerData({commit}) {
    const result = await api.get<ITickerDataItem[]>(ApiRoutes.ticker.getData);

    const tickerDataItems = [] as ITickerDataItem[];

    for (const [key, value] of Object.entries(result.data)) {
      let tickerDataItem = {} as ITickerDataItem;
      tickerDataItem = value;
      tickerDataItem.currency = key;
      tickerDataItems.push(tickerDataItem);
    }

    commit('setValidCurrenciesForBtcConversion', tickerDataItems.map(x => x.currency.toUpperCase()));

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
