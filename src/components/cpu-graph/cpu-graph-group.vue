<template>
  <v-card dark>
    <v-card-title class="card-header">CPU</v-card-title>
    <v-list-item>
      <v-list-item-content>
      <v-list-item-title>current load</v-list-item-title>
        <cpu-graph :id="10000" :cpu="combinedCpus"></cpu-graph>
      </v-list-item-content>
    </v-list-item>
    <v-expansion-panels class="accordion" accordion padding="0">
      <v-expansion-panel class="accordion">
        <v-expansion-panel-header>All CPUs</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item v-for="(cpu, i) in cpus" :key="i">
            <v-list-item-content>
              <cpu-graph :id="i" :cpu="cpu"></cpu-graph>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import CpuGraph from "./cpu-graph.vue";
export default {
  name: "cpu-graph-group",
  components: { CpuGraph },
  props: {
    temp: { type: Number, default: 0 },
    cpus: { type: Array, default: () => [] }
  },
  data: () => ({
    combinedCpus: { load: 0 }
  }),
  watch: {
    cpus(cpus) {
      const allCpuTemperatures = cpus.map(cpu => cpu.load);

      this.combinedCpus = {
        load: allCpuTemperatures.reduce((a, b) => a + b) / cpus.length
      };
    },
    temp(temp) {
      this.temp = temp;
    }
  }
};
</script>

<style>
  .accordion {
    padding: 0;
  }
</style>
