/* eslint-disable  @typescript-eslint/no-explicit-any */

import { actions } from "@/store/ticker-store";

import api from "@/api";
import { ApiRoutes } from "@/api-routes";
import { TestTickerData } from "../test-helpers/test-ticker-data";
import { ITickerData } from "@/dto-models/ticker-data";

describe("ProductStore", () => {
  const tickerData = TestTickerData.getTickerData();
  const tickerDataItems = TestTickerData.getTickerDataItems();

  (api.get as jest.Mock) = jest.fn((url) => {
    if (url === ApiRoutes.ticker.getData) {
      return Promise.resolve({ data: tickerData });
    }
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("actions", () => {
    it("getTickerData: calls api and returns ticker data items", async () => {
      let response;

      await (actions.getTickerData as any)({}).then((res: ITickerData) => {
        response = res;
        expect(response).toEqual(tickerDataItems);
      });

      expect((api.get as jest.Mock).mock.calls.length).toBe(1);
      expect((api.get as jest.Mock).mock.calls[0][0]).toBe(
        ApiRoutes.ticker.getData
      );
    });
  });
});
