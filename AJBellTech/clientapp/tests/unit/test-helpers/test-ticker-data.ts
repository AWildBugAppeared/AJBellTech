
import { TickerData } from '@/dto-models/ticker-data';
import * as tickerData from './json-models/ticker-data.json';

export class TestTickerData {
  public static getTickerData(): TickerData {
    return (tickerData as any).default;
  }
}
