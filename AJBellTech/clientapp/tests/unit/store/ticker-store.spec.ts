/* eslint-disable  @typescript-eslint/no-explicit-any */
import { actions, getters, mutations, State } from '@/store/ticker-store';

import api from '@/api';
import { ApiRoutes } from '@/api-routes';
import { TestTickerData } from '../test-helpers/test-ticker-data';
import { TickerData } from '@/dto-models/ticker-data';

describe('ProductStore', () => {
  const tickerData = TestTickerData.getTickerData();

  (api.get as jest.Mock) = jest.fn((url) => {
    if (url === ApiRoutes.ticker.getData) {
        return Promise.resolve({ data: tickerData });
      }
  });

  beforeEach(() => {});

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  
  describe('actions', () => {
    it('getTickerData: calls api and returns tickerData', async () => {
      let response;

      await (actions.getTickerData as any)({}).then((res: TickerData) => {
        response = res;
        expect(response).toEqual(tickerData);
      });

      expect((api.get as jest.Mock).mock.calls.length).toBe(1);
      expect((api.get as jest.Mock).mock.calls[0][0]).toBe(ApiRoutes.ticker.getData);
    });
  });
});
