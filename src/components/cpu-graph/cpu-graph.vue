<template>
  <v-sparkline
    :value="value"
    :height="30"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    :auto-draw="false"
  ></v-sparkline>
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

export default {
  name: "cpu-graph",
  props: {
    cpu: { type: Object, default: () => {} },
    id: { type: Number, required: true }
  },
  data: () => ({
    io: null,
    statsData: [],
    width: 1,
    radius: 10,
    padding: 0,
    lineCap: "round",
    gradient: gradients[5],
    value: new Array(100).fill(10),
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false
  }),
  watch: {
    cpu(cpu) {
      const oldRemoved = this.value.slice(1, this.value.length);
      this.value = [...oldRemoved, cpu.load];
    }
  }
};
</script>

<style></style>
