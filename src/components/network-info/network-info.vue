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
          <v-list-item-title class="speed-wrapper">
                <img style="height: 20px; width: 20px;" src="../../assets/transfer-down.png" />
           <span class="speed-digits"> {{ netData.traffic.download }} </span>
            <div>Mbit/s</div>
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
          <v-list-item-title class="speed-wrapper">
                <img class="transfer-icon" src="../../assets/transfer-up.png" />
            <span class="speed-digits"> {{ netData.traffic.upload }} </span> 
            <span>Mbit/s</span>
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

.speed-digits {
    font-family: DS-digital;
    font-size: 40px;
    padding: 4px;
}

.speed-wrapper {
  display: flex;
    align-items: center;
    flex-direction: column;
}

.transfer-icon {
    height: 20px;
    width: 20px;
}
</style>