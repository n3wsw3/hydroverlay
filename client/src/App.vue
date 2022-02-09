<template>
  <JSCharting class="chart" :options="waterChart"></JSCharting>
  <JSCharting class="chart" :options="ecChart"></JSCharting>

  <JSCharting class="chart" :options="phChart"></JSCharting>
  <JSCharting class="chart" :options="tempChart"></JSCharting>
  <clock></clock>
  <digital></digital>
</template>

<script setup lang="ts">
import JSCharting from "jscharting-vue";
import { ref } from "vue";
import { io } from "socket.io-client";
import { createChart, createSeries } from "./utils/chart";
import { SensorDataObj as SensorData } from "server/src/models/SensorData";
const socket = io("localhost:8000");
import clock from "@/components/clock.vue";
import digital from "./components/digital.vue";

const tempData = ref(createSeries("Temperature", "%yValue °C"));
const tempChart = createChart("Temperature", tempData, [10, 30]);

const waterData = ref(createSeries("Water Level", "%yValue l"));
const waterChart = createChart("Water Level", waterData, [0, 50]);

const ecData = ref(createSeries("EC", "%yValue mS/cm"));
const ecChart = createChart("EC", ecData, [-1000, 5000]);

const phData = ref(createSeries("pH", "%yValue"));
const phChart = createChart("pH", phData, [3, 8]);

// const fixed = (value: number, n: number) => parseFloat(value.toFixed(n));
const precision = (value: number, n: number) =>
  parseFloat(value.toPrecision(n));

const updateData = (data: SensorData) => {
  waterData.value.points?.push([data.createdAt, precision(data.waterLevel, 3)]);
  tempData.value.points?.push([data.createdAt, precision(data.temperature, 3)]);
  ecData.value.points?.push([data.createdAt, precision(data.ec * 1000, 3)]);
  phData.value.points?.push([data.createdAt, precision(data.ph, 2)]);

  // Make sure only 30 data points are showed at the same time.
  while (waterData.value.points?.length > 30) waterData.value.points?.shift();
  while (tempData.value.points?.length > 30) tempData.value.points?.shift();
  while (ecData.value.points?.length > 30) ecData.value.points?.shift();
  while (phData.value.points?.length > 30) phData.value.points?.shift();
};

socket.on("update", (data: SensorData | SensorData[]) => {
  if (Array.isArray(data)) {
    data.forEach((a) => updateData(a));
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
  background-color: indigo;
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

  &.square {
    flex-direction: column;
    .chart_container {
      margin-left: 0;
      margin-top: auto;
      width: 800px;
      flex-direction: column;
      .row {
        flex-direction: row;
      }
    }
  }
}
.chart {
  @aspect-ratio: 300/127;
  @width: 600px;
  @height: @width / @aspect-ratio;
  width: @width;
  height: @height;

  // path {
  //   fill: transparent;

  //   path {
  //     fill: white;
  //   }
  // }

  #brandingLogo {
    display: none;
  }

  svg {
    g {
      fill: white;
    }

    > g {
      > g {
        > path {
          fill: transparent;
        }
      }
    }
  }
}
</style>
