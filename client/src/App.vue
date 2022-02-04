<template>
  <div class="overlay">
    <div class="blackish">
      <p>Water: {{ data.waterLevel }} Liter</p>
      <p>Temperature: {{ data.temperature }} °C</p>
      <p>Ec: {{ data.ec }} mS/cm</p>
      <p>pH: {{ data.ph / 10 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { io } from "socket.io-client";
const socket = io("localhost:8000");

interface SensorData {
  waterLevel: number;
  temperature: number;
  ec: number;
  ph: number;
}

const data = ref<SensorData>({ waterLevel: 0, temperature: 0, ec: 0, ph: 0 });

socket.on("update", (_data) => {
  data.value = _data;
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
  background: no-repeat 0 0 url('~@/assets/overlay.png');
  background-size: 100% 100%;
  padding: 70px;
  width: 100vw;
  height: 100vh;
  color: white;
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
}
</style>
