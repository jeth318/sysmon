<template>
  <v-card dark>
    <v-card-title class="card-header">Processes</v-card-title>
    <v-data-table
      loading
      :disable-pagination="true"
      :hide-default-footer="true"
      :headers="headers"
      :items="topProcesses"
      :sort-by="['load']"
      :sort-desc="[false, true]"
      multi-sort
    ></v-data-table>
  </v-card>
</template>

<script>
export default {  
  name: "processes-info",
  props: {
    processesData: { type: Object, default: () => ({}) }
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
      return name.length < 15
        ? name
        : name.slice(0, 15) + '...'; 
    }
  },
  watch: {
    processesData(data) {
      this.topProcesses = data.topProcesses.map(process => ({
        percent: process.load,
        name: this.formatName(process.name),
        pid: process.pid,
        user: process.user
      }));
    }
  }
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
