<template>
  <v-card dark>
    <v-card-title class="card-header">CPU</v-card-title>
    <div class="cpu-container">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Temp {{ temp.toFixed() }} C</v-list-item-title>
          <v-list-item-title>Load {{ combinedCpus.load }} %</v-list-item-title>
          <cpu-graph id="main-cpu-graph" :cpu="combinedCpus"></cpu-graph>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-expansion-panels popout class="accordion" accordion padding="0">
      <v-expansion-panel class="accordion">
        <v-expansion-panel-header>All CPUs</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item class="list-item-border-bottom" v-for="(cpu, i) in cpus" :key="i">
            <v-list-item-content>
              <cpu-graph :id="`${i}`" :cpu="cpu"></cpu-graph>
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
        load: (
          allCpuTemperatures.reduce((a, b) => a + b) / cpus.length
        ).toFixed(0)
      };
    }
  }
};
</script>

<style>
.accordion {
  padding: 0;
}

.list-item-border-bottom {
  border-bottom: 1px solid grey;
}

.list-item-border-right {
  border-right: 1px solid grey;
}

.cpu-container {

}
</style>
