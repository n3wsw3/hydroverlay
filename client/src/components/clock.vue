<template>
  <div class="clock">
    <div class="outer-clock-face">
      <div
        v-for="(a, i) in angles"
        class="marking"
        :style="{ transform: `rotate(${a}deg)` }"
        :key="i"
      ></div>
      <div
        class="hand hour"
        :style="{ transform: `rotate(${hours}deg)` }"
      ></div>
      <div
        class="hand minute"
        :style="{ transform: `rotate(${minutes}deg)` }"
      ></div>
      <div
        class="hand seconds"
        :style="{ transform: `rotate(${seconds}deg)` }"
      ></div>
      <div class="button"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const angles = Array(12)
  .fill(0)
  .map((_, i) => i * 30);

const now = ref(new Date());

const seconds = computed(() => (now.value.getSeconds() / 60) * 360);
const minutes = computed(
  () => (now.value.getMinutes() / 60) * 360 + (now.value.getSeconds() / 60) * 6
);
const hours = computed(
  () => (now.value.getHours() / 12) * 360 + (now.value.getMinutes() / 60) * 30
);

// const hours = computed(() => 0);
// const minutes = computed(() => 0);
// const seconds = computed(() => 0);

setInterval(() => (now.value = new Date()), 1000);
</script>

<style lang="less">
.clock {
  @size: 20rem;
  @padding: @size / 30;
  @border: 0.3rem;
  @color: white;
  @background: transparent;
  width: @size;
  height: @size;
  position: relative;
  padding: @padding;
  border: @border solid @color;
  border-radius: 50%;
  margin: 1em;

  .outer-clock-face {
    position: relative;
    background: @background;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 100%;

    @center: (@size - 2 * (@padding + @border)) / 2;

    .marking {
      position: absolute;
      width: 3px;
      height: 30px;
      top: 0;
      left: 50%;
      background-color: white;
      transform-origin: 0 @center;
      margin-left: -$width/2;
    }

    .hand {
      position: absolute;
      top: @center - $height;
      left: 50%;
      width: 4px;
      height: @center;
      background-color: white;
      transform-origin: 0 $height;
      border-radius: 6px;

      &.hour {
        width: 0.6rem;
        height: @center * 0.5;
        top: @center - $height + $width/2;
        transform-origin: $width/2 ($height - $width/2);
        margin-left: -$width/2;
      }

      &.minute {
        width: 0.45rem;
        height: @center * 0.7;
        top: @center - $height + $width/2;
        transform-origin: $width/2 ($height - $width/2);
        margin-left: -$width/2;
      }

      &.seconds {
        width: 0.3rem;
        height: @center * 0.8;
        top: @center - $height + $width/2;
        transform-origin: $width/2 ($height - $width/2);
        margin-left: -$width/2;
      }
    }

    .button {
      position: absolute;
      top: 50%;
      left: 50%;
      @size: 15px;
      width: @size;
      height: @size;
      @offset: 0px;
      margin: -$height/2 + @offset -$width/2-2 * @offset;
      background-color: @color;
      border-radius: @size;
    }
  }
}
</style>
