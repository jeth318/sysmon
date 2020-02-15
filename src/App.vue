<template>
  <div v-if="staticData.system">
    <!--     <div class="vendor-logo-wrapper">
      <img src="./assets/pi_logo_rotating.gif" style="width: 50%" />
    </div>-->
    <v-container wrap fluid>
      <v-row dense>
        <v-col :cols="12">
          <cpu-graph-group :temp="cpuData.temp" :cpus="cpuData.cpus"></cpu-graph-group>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <sys-info :sysData="combinedSysData"></sys-info>
        </v-col>
        <v-col :cols="8" style="padding-top: 0;">
          <v-row dense>
            <v-col :cols="6">
              <memory-info :memData="memData" :staticMemData="staticData.memLayout"></memory-info>
            </v-col>
            <v-col :cols="6">
              <network-info :netData="netData"></network-info>   
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

import CpuGraphGroup from "./components/cpu-graph/cpu-graph-group.vue";
import SysInfo from "./components/sys-info/sys-info.vue";
import MemoryInfo from "./components/memory-info/memory-info.vue";
import NetworkInfo from "./components/network-info/network-info.vue";

export default {
  name: "App",
  components: { CpuGraphGroup, SysInfo, MemoryInfo, NetworkInfo },
  data: () => ({
    io: null,
    isConnected: false,
    cpuData: {},
    sysData: {},
    netData: {},
    staticData: {},
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: new Array(100).fill(10),
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false
  }),
  computed: {
    combinedSysData() {
      return {
        hardware: this.staticData.system,
        os: this.staticData.os
      };
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    soc_cpu_data(data) {
      this.cpuData = data;
    },
    soc_sys_data(data) {
      this.sysData = data;
    },
    soc_mem_data(data) {
      this.memData = data;
    },
    soc_net_data(data) {
      this.netData = data;
    },
    soc_static_data(data) {
      this.staticData = data;
    }
  }
};
</script>

<style>

@font-face {
  font-family: DS-Digital;
  src: url(./assets/ds_digital/DS-DIGII.TTF);
}

html,
body {
  padding-left: 20px;
  padding-right: 20px;
}
.card-header {
  background-color: orange !important;
  color: black;
  padding: 4px !important;
  font-weight: 600 !important;
}
.list-item-border-bottom {
  border-bottom: 1px solid grey;
}
html {
  font-family: "Inconsolata", monospace;
  background-color: darkslategrey;
}
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.vendor-logo-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
</style>
