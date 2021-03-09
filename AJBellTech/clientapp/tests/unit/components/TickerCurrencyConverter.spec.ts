/* eslint-disable  @typescript-eslint/no-explicit-any */

import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { createLocalVue, mount, Wrapper } from "@vue/test-utils";

import TickerCurrencyConverter from "@/components/TickerCurrencyConverter.vue";
import { CurrencyConversionQueryModel } from "@/query-models/currency-conversion-query-model";

Vue.use(Vuex);

describe("TickerCurrencyConverter.vue", () => {
  let actions: {
    getBtcAmountFromCurrency: jest.Mock;
  };

  const btcAmountReturnedFromApi = 0.001;

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

    actions = {
      getBtcAmountFromCurrency: jest
        .fn()
        .mockResolvedValue(btcAmountReturnedFromApi),
    };

    mountWrapper = () => {
      const storeData = {
        modules: {
          ticker: {
            state: {
              validCurrenciesForBtcConversion: [
                "GBP",
                "USD",
                "EUR",
                "CAD",
                "AUD",
              ],
            },
            namespaced: true,
            actions: actions as any,
          },
        },
      };
      const $store = new Vuex.Store(storeData);

      wrapper = mount(TickerCurrencyConverter, {
        localVue,
        vuetify,
        data() {
          return {};
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
    it("should render default view", async () => {
      mountWrapper();
      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();
    });

    it("should render error message", async () => {
      mountWrapper();
      wrapper.vm.errorMessage = "error";
      await wrapper.vm.$nextTick();

      const message = wrapper.find("[data-error]");

      expect(message.html()).toMatchInlineSnapshot(`
        <div data-error="" class="row justify-center">
          <div class="red--text col col-8">error</div>
        </div>
      `);
    });

    it("should render conversion message", async () => {
      mountWrapper();
      wrapper.vm.btcAmount = 0.1234;
      wrapper.vm.currencyAmountConverted = 20;
      wrapper.vm.selectedCurrency = "GBP";
      await wrapper.vm.$nextTick();

      const message = wrapper.find("[data-conversion-result]");

      expect(message.html()).toMatchInlineSnapshot(`
        <div data-conversion-result="" class="row green--text justify-center">
          <div class="col col-8">
            20 units of GBP equals
            0.1234 in BTC
          </div>
        </div>
      `);
    });
  });

  describe("methods", () => {
    describe("submit", () => {
      beforeEach(() => {
        mountWrapper();
        (wrapper.vm.$refs.form as any).validate = jest
          .fn()
          .mockReturnValue(true);
      });

      it("should not make api call when form is not valid ", async () => {
        mountWrapper();
        wrapper.vm.submit();

        await wrapper.vm.$nextTick();

        expect(actions.getBtcAmountFromCurrency.mock.calls.length).toBe(0);
      });

      it("should set state to loading when submitting, and reset when finished", async () => {
        wrapper.vm.submit();

        expect(wrapper.vm.isLoading).toBe(true);

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isLoading).toBe(false);
      });

      it("should clear data before making api call", () => {
        wrapper.vm.btcAmount = 10;
        wrapper.vm.currencyAmountConverted = 0;
        wrapper.vm.errorMessage = "error";
        wrapper.vm.submit();

        expect(wrapper.vm.btcAmount).toBe(0);
        expect(wrapper.vm.currencyAmountConverted).toBe(0);
        expect(wrapper.vm.errorMessage).toBe("");
      });

      it("should process successful response", async () => {
        const amount = 20;
        const currency = "GBP";
        const payload: CurrencyConversionQueryModel = {
          amount: amount,
          currency: currency,
        };

        wrapper.vm.amount = amount;
        wrapper.vm.selectedCurrency = currency;

        wrapper.vm.submit();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(actions.getBtcAmountFromCurrency.mock.calls.length).toBe(1);
        expect(actions.getBtcAmountFromCurrency.mock.calls[0][1]).toEqual(
          payload
        );
        expect(wrapper.vm.btcAmount).toBe(btcAmountReturnedFromApi);
      });

      it("should process unsuccessful response", async () => {
        let errorMessage = "error";
        actions.getBtcAmountFromCurrency = jest.fn().mockRejectedValue({
          response: {
            data: errorMessage,
          },
        });

        mountWrapper();
        (wrapper.vm.$refs.form as any).validate = jest
          .fn()
          .mockReturnValue(true);

        const amount = 20;
        const currency = "GBP";
        const payload: CurrencyConversionQueryModel = {
          amount: amount,
          currency: currency,
        };

        wrapper.vm.amount = amount;
        wrapper.vm.selectedCurrency = currency;

        wrapper.vm.submit();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.errorMessage).toBe(errorMessage);
      });
    });
  });
});
