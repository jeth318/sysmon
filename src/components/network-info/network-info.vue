<template>
  <v-card dark>
    <v-card-title class="card-header">NETWORK</v-card-title>
    <v-list-item class="list-item-border-bottom" two-line>
      <v-list-item-content>
        <v-list-item-title>Interface</v-list-item-title>
        <v-list-item-subtitle>{{ netData.interface }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="list-item-border-bottom" two-line>
      <v-list-item-content>
          <v-list-item-title style="display: flex;">
                <img style="height: 20px; width: 20px;" src="../../assets/transfer-down.png" />
            {{ netData.traffic.download }} Mbit/s
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
          <v-list-item-title style="display: flex;">
                <img class="transfer-icon" src="../../assets/transfer-up.png" />
            {{ netData.traffic.upload }} Mbit/s
          </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "network-info",
  props: {
    netData: { type: Object, default: () => ({}) }
  }
};
</script>

<style>
.speed {
  display: flex;
  justify-content: center;
  align-items: center;
}

.transfer-icon {
    height: 20px;
    width: 20px;
}
</style>