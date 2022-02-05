<template>
  <div class="overlay">
    <div class="chart_container">
      <div class="row">
        <JSCharting class="chart" :options="waterChart"></JSCharting>
        <JSCharting class="chart" :options="tempChart"></JSCharting>
      </div>
      <div class="row">
        <JSCharting class="chart" :options="ecChart"></JSCharting>
        <JSCharting class="chart" :options="phChart"></JSCharting>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import JSCharting, { JSC } from "jscharting-vue";
import { Ref, ref } from "vue";
import { io } from "socket.io-client";
const socket = io("localhost:8000");

interface SensorData {
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  waterLevel: number;
  temperature: number;
  ec: number;
  ph: number;
}

const tempData = ref<JSC.JSCSeriesConfig>({
  name: "Temperature",
  yAxis: "temperature",
  defaultPoint_label: {
    visible: true,
    text: "%yValue °C",
  },
  points: [],
});

const ecData = ref<JSC.JSCSeriesConfig>({
  name: "EC",
  yAxis: "ec",
  defaultPoint_label: {
    visible: true,
    text: "%yValue mS/cm",
  },
  points: [],
});

const phData = ref<JSC.JSCSeriesConfig>({
  name: "pH",
  yAxis: "ph",
  defaultPoint_label: {
    visible: true,
    text: "%yValue",
  },
  points: [],
});

const waterData = ref<JSC.JSCSeriesConfig>({
  name: "Water Level",
  yAxis: "waterLevel",
  defaultPoint_label: {
    visible: true,
    text: "%yValue l",
  },
  points: [],
});

const createChart = (
  title: string,
  data: Ref<JSC.JSCSeriesConfig>,
  range: JSC.Range
) => ({
  type: "line spline",
  title: {
    position: "center",
    label: {
      text: title,
    },
  },
  legend_visible: false,
  xAxis: {
    scale: {
      type: "time",
    },
    defaultTick: {
      enabled: false,
    },
  },
  yAxis: {
    defaultTick: {
      enabled: false,
    },
    scale: {
      range,
    },
  },
  series: [data.value],
});

const waterChart = createChart("Water Level", waterData, [0, 50]);
const tempChart = createChart("Temperature", tempData, [10, 30]);
const ecChart = createChart("EC", ecData, [0, 4000]);
const phChart = createChart("pH", phData, [3, 8]);

// const fixed = (value: number, n: number) => parseFloat(value.toFixed(n));
const precision = (value: number, n: number) => parseFloat(value.toPrecision(n));

const updateData = (data: SensorData) => {
  waterData.value.points?.push([data.createdAt, precision(data.waterLevel, 3)]);
  tempData.value.points?.push([data.createdAt, precision(data.temperature, 3)]);
  ecData.value.points?.push([data.createdAt, precision(data.ec*1000, 3)]);
  phData.value.points?.push([data.createdAt, precision(data.ph, 2)]);

  // Make sure only 30 data points are showed at the same time.
  while (waterData.value.points?.length > 30) waterData.value.points?.shift();
  while (tempData.value.points?.length > 30) tempData.value.points?.shift();
  while (ecData.value.points?.length > 30) ecData.value.points?.shift();
  while (phData.value.points?.length > 30) phData.value.points?.shift();
}

socket.on("update", (data: SensorData | SensorData[]) => {
  if (Array.isArray(data)) {
    data.forEach(a => updateData(a));
  } else {
    updateData(data);
  }
});
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

.overlay {
  background: no-repeat 0 0 url("~@/assets/overlay.png");
  background-size: 100% 100%;
  padding: 70px;
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  .blackish {
    margin: 0;
    padding: 10px;
    display: inline-block;
    background-color: rgba(black, 0.2);

    p {
      margin: 0;
      font-size: 1.5em;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
    }
  }

  .chart_container {
    width: 100%;
    display: flex;
    margin-top: auto;
    .row {
      display: flex;
      flex: 1;
      .chart {
        display: inline-block;
        flex: 1;
        height: 200px;
        padding: 0.5em;
      }
    }
  }

  &.side {
    flex-direction: row;
    .chart_container {
      margin-top: 0;
      margin-left: auto;
      width: 400px;
      flex-direction: column;
      .row {
        flex-direction: column;
      }
    }
  }
}
</style>
