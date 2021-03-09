<template>
  <div>
    <h1 class="pa-8 white--text">AJ Bell Investment Platform</h1>
    <Ticker></Ticker>
    <TickerCurrencyConverter></TickerCurrencyConverter>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Ticker from "@/components/Ticker.vue";
import TickerCurrencyConverter from "@/components/TickerCurrencyConverter.vue";

export default Vue.extend({
  name: "Home",
  components: { Ticker, TickerCurrencyConverter },
});
</script>
