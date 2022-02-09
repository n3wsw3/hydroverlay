<template>
  <div class="digital">
    <div class="hour">
      <span v-for="(num, i) in hour" :key="i">{{num}}</span>
    </div>
    <div class="minute">
      <span v-for="(num, i) in minute" :key="i">{{num}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const now = ref(new Date());

const hour = computed(() => now.value.getHours().toString().padStart(2, "0").split(""));
const minute = computed(() => now.value.getMinutes().toString().padStart(2, "0").split(""));

setInterval(() => (now.value = new Date()), 1000);
</script>

<style lang="less">
@import (css)
  url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap");
.digital {
  @size: 100px;
  font-size: @size;
  padding: 1rem;
  font-family: "Orbitron", sans-serif;
  > div {
    line-height: @size;
  }

  span {
    width: 0.85*@size;
    text-align: center;
    display: inline-block;
  }
}
</style>
