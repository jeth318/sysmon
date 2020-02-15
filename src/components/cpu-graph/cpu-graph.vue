<template>
<div :style="`width: 100%; height: ${getParentHeight()}px;`" :ref="`canvas-container_${id}`">
  <canvas :id="`cpu_canvas_${id}`" :ref="`cpu_canvas_${id}`" ></canvas>
</div>
</template>

<script>

import { TimeSeries, SmoothieChart } from "../../utils/smoothie.js";
const smoothieOptions = { grid: { strokeStyle:'#1e1e1e', fillStyle:'#1e1e1e', verticalSections: 0, millisPerLine: 0}, minValue: 0, maxValue: 100 };

export default {
  name: "cpu-graph",
  props: {
    cpu: { type: Object, default: () => {} },
    id: { type: String, required: true }
  },
  data: () => ({
    io: null,
    smoothie: null,
    dataStream: null
  }),
  created() {
    window.addEventListener("resize", this.setCanvasWidth);
  },
  mounted() {
    this.smoothie = new SmoothieChart(smoothieOptions);
    this.dataStream = new TimeSeries();
    this.smoothie.addTimeSeries(this.dataStream, { strokeStyle:'rgb(0, 255, 0)', lineWidth:3 });
    this.smoothie.streamTo(document.getElementById(`cpu_canvas_${this.id}`), 1000);
    this.setCanvasWidth();
  },
  methods: {
    setCanvasWidth() {
      const canvasContainerElement = this.$refs[`canvas-container_${this.id}`];
      const canvas = this.$refs[`cpu_canvas_${this.id}`];
      canvas.width = canvasContainerElement.clientWidth;
      canvas.height = canvasContainerElement.clientHeight;
    },
    getParentHeight() {
      return this.id === 'main-cpu-graph' ? 120 : 50;
    }
  },
  watch: {
    cpu(cpu) {
      this.dataStream.append(new Date().getTime(), cpu.load);
    }
  }
};
</script>
