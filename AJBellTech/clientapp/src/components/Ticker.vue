<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-data-table
        :headers="headers"
        :items="tickerDataItems"
        :sort-by="['15m']"
      >
        <template #[`item.currency`]="{ item }">
          {{ item.currency.toUpperCase() }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";

import { ITickerDataItem } from "@/dto-models/ticker-data-item";

export default Vue.extend({
  name: "Ticker",

  data() {
    return {
      headers: [
        { text: "Currency", value: "currency" },
        { text: "15m", value: "15m" },
        { text: "Last", value: "last" },
        { text: "Buy", value: "buy" },
        { text: "Sell", value: "sell" },
        { text: "Symbol", value: "symbol" },
      ],
      tickerDataItems: [] as ITickerDataItem[],
      tickerDataRefreshInterval: 3000,
    };
  },

  created() {
    this.loadTickerData();

    setInterval(() => {
      this.loadTickerData();
    }, this.tickerDataRefreshInterval);
  },

  methods: {
    ...mapActions("ticker", ["getTickerData"]),

    loadTickerData() {
      this.getTickerData().then((tickerDataItems: ITickerDataItem[]) => {
        this.tickerDataItems = tickerDataItems;
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
