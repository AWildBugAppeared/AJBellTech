/* eslint-disable  @typescript-eslint/no-explicit-any */

import { ITickerData } from "@/dto-models/ticker-data";
import { ITickerDataItem } from "@/dto-models/ticker-data-item";
import * as tickerData from "./json-models/ticker-data.json";
import * as tickerDataItems from "./json-models/ticker-data-items.json";

export class TestTickerData {
  public static getTickerData(): ITickerData {
    return (tickerData as any).default;
  }

  public static getTickerDataItems(): ITickerDataItem[] {
    return (tickerDataItems as any).default;
  }
}
