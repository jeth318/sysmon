<template>
  <div v-if="staticData.system">
    <div class="vendor-logo-wrapper">
      <img src="./assets/pi_logo_rotating.gif" style="width: 20%" />
      <div class="page-heading">RASPI-SYSMON</div>
    </div>
    <v-container wrap fluid>
      <v-row dense>
        <v-col :cols="4">
          <cpu-graph-group :processesData="processesData" :temp="cpuData.temp" :cpus="cpuData.cpus"></cpu-graph-group>
        </v-col>
        <v-col :cols="5">
          <processes-info :processesData="processesData"></processes-info>
        </v-col>
                <v-col :cols="3">
         <services-info :servicesData="servicesData"></services-info>
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
          <v-row dense>
            <v-col :cols="6">
              
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CpuGraphGroup from "./components/cpu-graph/cpu-graph-group.vue";
import SysInfo from "./components/sys-info/sys-info.vue";
import MemoryInfo from "./components/memory-info/memory-info.vue";
import NetworkInfo from "./components/network-info/network-info.vue";
import ProcessesInfo from "./components/processes-info/processes-info.vue";
import ServicesInfo from "./components/services-info/services-info.vue";

export default {
  name: "App",
  components: {
    CpuGraphGroup,
    ProcessesInfo,
    SysInfo,
    MemoryInfo,
    NetworkInfo,
    ServicesInfo
  },
  data: () => ({
    io: null,
    isConnected: false,
    cpuData: {},
    sysData: {},
    netData: {},
    staticData: {},
    processesData: {},
    servicesData: {}
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
    },
    soc_processes_data(data) {
      this.processesData = data;
    },
    soc_services_data(data) {
      this.servicesData = data;
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

.v-card {
  min-width: 150px !important;
  height: 100%;
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
  justify-content: flex-start;
  align-items: center;
  font-size: 30px;
  color: white;
  width: 50%;
}
</style>
