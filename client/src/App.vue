<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="overlay">
    <div class="blackish">
      <p>Water: {{ data.waterLevel }} Liter</p>
      <p>Temperature: {{ data.temperature }} °C</p>
      <p>Ec: {{ data.ec }} mS/cm</p>
      <p>pH: {{ data.ph / 10 }}</p>
    </div>
  </div>
  <!-- <Particles
    id="particle"
    :options="{
      // autoPlay: true,
      backgroundMode: {
        enable: true,
      },
      motion: {
        disable: false,
      },
      emitters: {
        direction: 'top',
        size: {
          width: 50,
          height: 0,
        },
        rate: {
          delay: 5,
          quantity: 2,
        },
        position: {
          x: 90,
          y: 90,
        },
      },
      particles: {
        number: {
          value: 0,
        },
        color: {
          value: ['#ab058b', '#4c0082'],
        },
        size: {
          value: 50,
        },
        move: {
          enable: true,
          speed: 4,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'destroy',
        },
      },
    }"
  >
  </Particles> -->
</template>

<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
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

socket.on("connection", () => {
  console.log("tjo");
  socket.emit("TJO");
});

socket.on("update", (_data) => {
  data.value = _data;
});
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: white;
  /* margin-top: 60px; */
}

#particle {
  height: 200px;
}
.overlay {
  width: 100vw;
  height: 100vh;
  color: white;
  .blackish {
    margin: 0;
    padding: 10px;
    // width: 100px;
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
