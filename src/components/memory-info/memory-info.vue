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
      <v-list-item-content v-for="(entry, key) in staticMemData" :key="key">
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
    staticMemData: { type: Array, default: () => [] }
  },
  data: () => ({
    staticMemData: [],
    dynamicMemData: {}
  }),
  computed: {
    totalCapacity() {
      const allMemoryBanks = this.staticMemData.map(bank => bank.size);
      return allMemoryBanks.reduce((a, b) => a + b) / 1024 / 1024 / 1024;
    }
  },
  watch: {
    memoryData(data) {
      this.hardware = data.hardware;
      this.os = data.os;
    }
  }
};
</script>

<style></style>
