/* eslint-disable  @typescript-eslint/no-explicit-any */

import { actions, State } from "@/store/ticker-store";

import api from "@/api";
import { ApiRoutes } from "@/api-routes";
import { TestTickerData } from "../test-helpers/test-ticker-data";
import { ITickerData } from "@/dto-models/ticker-data";
import { CurrencyConversionQueryModel } from "@/query-models/currency-conversion-query-model";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const querystring = require('querystring');

describe("ProductStore", () => {
  let state: State;

  const tickerData = TestTickerData.getTickerData();
  const tickerDataItems = TestTickerData.getTickerDataItems();

  (api.get as jest.Mock) = jest.fn((url) => {
    if (url === ApiRoutes.ticker.getData) {
      return Promise.resolve({ data: tickerData });
    }

    if (url.includes(ApiRoutes.ticker.getBtcAmountFromCurrency)) {
      return Promise.resolve({ data: 20 });
    }
  });

  beforeEach(() => {
    state = new State();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("actions", () => {
    it("getTickerData: calls api and returns ticker data items, setting valid btc currencies to state", async () => {
      let response;
      const commit = jest.fn();

      await (actions.getTickerData as any)({ commit }).then((res: ITickerData) => {
        response = res;
        expect(response).toEqual(tickerDataItems);
      });

      expect((api.get as jest.Mock).mock.calls.length).toBe(1);
      expect((api.get as jest.Mock).mock.calls[0][0]).toBe(ApiRoutes.ticker.getData);
      expect(commit.mock.calls.length).toBe(1);
      expect(commit.mock.calls[0][0]).toEqual('setValidCurrenciesForBtcConversion');
      expect(commit.mock.calls[0][1]).toEqual(tickerDataItems.map(x => x.currency.toUpperCase()));
    });
    
    it("getBtcAmountFromCurrency: calls api and returns reponse", async () => {
      let response;

      const payload: CurrencyConversionQueryModel = {
        amount: 20,
        currency: 'GBP',
      } 

      await (actions.getBtcAmountFromCurrency as any)({}, payload).then((res: number) => {
        response = res;
        expect(response).toEqual({ data: 20 });
      });

      expect((api.get as jest.Mock).mock.calls.length).toBe(1);
      expect((api.get as jest.Mock).mock.calls[0][0]).toBe(
        `${ApiRoutes.ticker.getBtcAmountFromCurrency}?${querystring.stringify(payload)}`
      );
    });
  });
});
