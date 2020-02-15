<template>
  <v-card dark>
    <v-card-title class="card-header">System Information</v-card-title>
    <v-list-item class="list-item-border-bottom" two-line>
      <v-list-item-content>
        <span v-for="(entry, key) in hardwareList" :key="`${key}_static`">
          <v-list-item-title>{{ entry[0] }}</v-list-item-title>
          <v-list-item-subtitle>{{ entry[1] }}</v-list-item-subtitle>
        </span>
      </v-list-item-content>
    </v-list-item>
    <v-expansion-panels class="accordion" accordion padding="0">
      <v-expansion-panel class="accordion">
        <v-expansion-panel-header>OS Details</v-expansion-panel-header>
        <v-expansion-panel-content class="no-padding">
          <v-list-item class="list-item-border-bottom" two-line>
            <v-list-item-content>
              <span v-for="(entry, key) in osList" :key="`${key}_static`">
                <v-list-item-title>{{ entry[0] }}</v-list-item-title>
                <v-list-item-subtitle>{{ entry[1] }}</v-list-item-subtitle>
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: "sys-info",
  props: {
    sysData: { type: Object, default: () => ({}) }
  },
  data: () => ({
    hardware: {
      manufacturer: null,
      model: null,
      version: null,
      serial: null,
      vendor: null
    },
    os: {
      platform: null,
      distro: null,
      release: null,
      codename: null,
      kernel: null
    },
    additional: {}
  }),
  methods: {
    capitalize(string) {
      return string.replace(/^\w/, c => c.toUpperCase());
    }
  },
  computed: {
    hardwareList() {
      return Object.entries(this.hardware)
        .filter(entry => entry[1])
        .map(entry => [this.capitalize(entry[0]), entry[1]]);
    },
    osList() {
      return Object.entries(this.os)
        .filter(item => item[1])
        .map(entry => [this.capitalize(entry[0]), entry[1]]);
    }
  },
  watch: {
    sysData: {
      immediate: true,
      handler(data) {
        this.hardware = data.hardware;
        this.os = data.os;
      }
    }
  }
};
</script>

<style>
.card-header {
  background-color: orange !important;
  color: black;
}
.no-padding > div:first-of-type {
  padding: 0 !important;
}
</style>
