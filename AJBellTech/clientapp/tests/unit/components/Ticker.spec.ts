/* eslint-disable  @typescript-eslint/no-explicit-any */

import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { createLocalVue, mount, Wrapper } from "@vue/test-utils";

import Ticker from "@/components/Ticker.vue";

import { TestTickerData } from "../test-helpers/test-ticker-data";

Vue.use(Vuex);

jest.useFakeTimers();

describe("Ticker.vue", () => {
  const tickerDataItems = TestTickerData.getTickerDataItems();

  const actions = {
    getTickerData: jest.fn().mockResolvedValue(tickerDataItems),
  };

  const localVue = createLocalVue();
  let wrapper: Wrapper<Vue & { [key: string]: any }>;
  let mountWrapper: () => void;

  beforeEach(() => {
    const vuetify = new Vuetify({
      mocks: {
        $vuetify: {},
      },
    });
    Vue.use(Vuetify);
    document.body.setAttribute("data-app", "true");

    mountWrapper = () => {
      const storeData = {
        modules: {
          ticker: {
            namespaced: true,
            actions: actions as any,
          },
        },
      };
      const $store = new Vuex.Store(storeData);

      wrapper = mount(Ticker, {
        localVue,
        vuetify,
        data() {
          return {
            tickerDataRefreshInterval: 3000,
          };
        },
        mocks: {
          $store,
        },
      });
    };
  });

  afterEach(() => {
    wrapper.destroy();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render ticker data ordered by 15m", async () => {
      mountWrapper();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("created", () => {
    it("should get ticker data on creation", () => {
      const spy = jest.spyOn((Ticker as any).options.methods, "loadTickerData");
      mountWrapper();

      expect(spy.mock.calls.length).toBe(1);
    });

    it("should get ticker data every 3 seconds", () => {
      const spy = jest.spyOn((Ticker as any).options.methods, "loadTickerData");
      mountWrapper();

      for (let i = 1; i < 4; i++) {
        jest.advanceTimersByTime(3000);
        //Since the methods is called outside the timer once, we do i+1
        expect(spy.mock.calls.length).toBe(i + 1);
      }
    });
  });

  describe("methods", () => {
    describe("loadTickerData", () => {
      it("should get ticker data", () => {
        const spy = jest.spyOn(
          (Ticker as any).options.methods,
          "loadTickerData"
        );
        mountWrapper();
        spy.mockRestore();

        wrapper.vm.loadTickerData();

        expect(actions.getTickerData.mock.calls.length).toBe(1);
      });
    });
  });
});
