<template>
  <div>
    <h1>AJ Bell Investment Platform</h1>
    <Ticker></Ticker>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Ticker from "@/components/Ticker.vue";

export default Vue.extend({
  name: "Home",
  components: { Ticker },
});
</script>
