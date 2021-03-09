<template>
  <div>
    <v-form id="currencyConversionForm" ref="form" @submit.prevent="submit">
      <v-row justify="center">
        <v-col cols="3">
          <v-select
            v-model="selectedCurrency"
            :items="validCurrenciesForBtcConversion"
            :rules="[requiredRule]"
            label="Select Currency"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="amount"
            label="Enter Amount"
            type="number"
            :rules="[requiredRule]"
          ></v-text-field>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn
            :loading="isLoading"
            form="currencyConversionForm"
            type="submit"
            @click="submit"
            >Convert to Btc</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-row v-if="errorMessage" justify="center" data-error>
      <v-col cols="8" class="red--text">{{ errorMessage }}</v-col>
    </v-row>
    <v-row
      v-if="btcAmount"
      justify="center"
      class="green--text"
      data-conversion-result
    >
      <v-col cols="8">
        {{ currencyAmountConverted }} units of {{ selectedCurrency }} equals
        {{ btcAmount }} in BTC
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "vuex";
import Vue from "vue";
import { CurrencyConversionQueryModel } from "@/query-models/currency-conversion-query-model";

export default Vue.extend({
  name: "TickerCurrencyConverter",

  data() {
    return {
      amount: 0,
      btcAmount: 0,
      currencyAmountConverted: 0,
      errorMessage: "",
      isLoading: false,
      requiredRule: (v: string | number) => !!v || "This field is required",
      selectedCurrency: "",
    };
  },

  computed: {
    ...mapState("ticker", ["validCurrenciesForBtcConversion"]),
  },

  methods: {
    ...mapActions("ticker", ["getBtcAmountFromCurrency"]),

    submit() {
      const isValid = (this.$refs.form as Vue & {
        validate: () => boolean;
      }).validate();

      if (!isValid) return;

      this.isLoading = true;
      this.btcAmount = 0;
      this.currencyAmountConverted = 0;
      this.errorMessage = "";

      var payload: CurrencyConversionQueryModel = {
        amount: this.amount,
        currency: this.selectedCurrency,
      };

      this.getBtcAmountFromCurrency(payload)
        .then((amount: number) => {
          this.currencyAmountConverted = this.amount;
          this.btcAmount = amount;
        })
        .catch((res) => {
          this.errorMessage = res.response.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<style lang="scss" scoped></style>
