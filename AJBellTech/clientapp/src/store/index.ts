import Vue from "vue";
import Vuex from "vuex";

import tickerStoreModule from "./ticker-store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ticker: tickerStoreModule,
  },
});
