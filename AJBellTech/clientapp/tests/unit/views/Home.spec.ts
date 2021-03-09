/* eslint-disable  @typescript-eslint/no-explicit-any */

import Vue from "vue";
import Vuetify from "vuetify";
import { createLocalVue, mount, Wrapper } from "@vue/test-utils";

import Home from "@/views/Home.vue";

describe("Home.vue", () => {
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
      wrapper = mount(Home, {
        localVue,
        vuetify,
        data() {
          return {};
        },
        stubs: ['Ticker', 'TickerCurrencyConverter'],
      });
    };
  });

  afterEach(() => {
    wrapper.destroy();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render components", async () => {
      mountWrapper();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
