<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="overlay">
    {{ data }}
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

const data = ref<string>("");

socket.on("connection", () => {
  console.log("tjo");
  socket.emit("TJO");
});

socket.on("update", (_data) => {
  data.value = _data;
});
</script>

<style>
body  {
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
  color: gray;
}
</style>
