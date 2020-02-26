<template>
  <v-card dark v-if="servicesData">
    <v-card-title class="card-header">Services</v-card-title>
    <v-list-item
      class="list-item-border-bottom"
      two-line
      v-for="(service, key) in servicesData"
      :key="key"
    >
      <v-list-item-content>
        <v-list-item-title>
          <div style="display: flex; align-items: center;">
            <img style="width: 18px; height: 18px; margin-right: 5px;" :src="getStatusUrl(key)" alt="status" />
            {{ service.name }}
          </div>
        </v-list-item-title>

        <v-list-item-subtitle>Active: {{ service.running }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "services-info",
  props: {
    servicesData: { type: Array, default: () => [] }
  },
  data: () => ({
    topProcesses: [],
    headers: [
      {
        text: "CPU %",
        align: "left",
        sortable: true,
        value: "percent"
      },
      { text: "Name", align: "left", value: "name" },
      { text: "Pid", align: "left", value: "pid" },
      { text: "User", align: "left", value: "user" }
    ]
  }),
  methods: {
    formatName(name) {
      return name.length < 15 ? name : name.slice(0, 15) + "...";
    },
    getStatusUrl(key) {
      if (!this.servicesData[key]) {
        return "";
      }
      return this.servicesData[key].running
        ? require("../../assets/" + "chevron-up-circle.png")
        : require("../../assets/" + "chevron-down-circle.png");
    }
  },
  watch: {}
};
</script>
<style>
.processes-list-item-content {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  border-bottom: 1px solid grey;
}

th {
  text-align: left;
}

.cpu-top-process-percentage {
  font-size: 20px;
  color: white;
  min-width: 30px !important;
}
</style>
