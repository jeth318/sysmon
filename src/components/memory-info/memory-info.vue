<template>
  <v-card dark>
    <v-card-title class="card-header">RAM</v-card-title>
    <v-list-item class="list-item-border-bottom" two-line>
      <v-list-item-content>
        <v-list-item-title>Total</v-list-item-title>
        <v-list-item-subtitle>{{ totalCapacity }} GB</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="list-item-border-bottom" two-line>
      <v-list-item-content>
        <span class="ram-bank" v-for="(entry, key) in staticMemData" :key="key">
          <v-list-item-title>{{ entry[0] }}</v-list-item-title>
          <v-list-item-subtitle>{{ entry[1] }}</v-list-item-subtitle>
        </span>
        <v-list-item-title>Memory Used</v-list-item-title>
        <v-list-item-subtitle>{{ memoryUsed}} MB</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="list-item-border-bottom" two-line>
      <v-list-item-content
        class="ram-bank"
        v-for="(entry, key) in staticMemData"
        :key="key"
      >
        <v-list-item-title>Capacity</v-list-item-title>
        <v-list-item-subtitle
          >{{ entry.size / 1024 / 1024 }} MB</v-list-item-subtitle
        >
        <v-list-item-title>Installed</v-list-item-title>
        <v-list-item-subtitle>{{ entry.bank }}</v-list-item-subtitle>
        <v-list-item-title>Manufacturer</v-list-item-title>
        <v-list-item-subtitle>{{ entry.manufacturer }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "memory-info",
  props: {
    staticMemData: { type: Array, default: () => [] },
    memData: { type: Object, default: () => ({}) }
  },
  data: () => ({
  }),
  computed: {
    totalCapacity() {
      const allMemoryBanks = this.staticMemData.map(bank => bank.size);
      return allMemoryBanks.reduce((a, b) => a + b) / 1024 / 1024 / 1024;
    },
    memoryUsed() {
        return Math.round((this.memData.total - this.memData.active) / 1024 / 1024);
    }
  },
  watch: {
    memData(data) {
      this.os = data.os;
    }
  }
};
</script>

<style>
.ram-bank:first-child {
  border-right: 1px solid grey;
}

.ram-bank:nth-child(2) {
  padding-left: 16px;
}
</style>
