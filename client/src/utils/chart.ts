import { JSC } from "jscharting-vue";
import { Ref } from "vue";

export const createSeries = (
  name: string,
  id: string,
  text: string
): JSC.JSCSeriesConfig => ({
  name,
  yAxis: id,
  defaultPoint_label: {
    visible: true,
    text,
  },
  points: [],
});

export const createChart = (
  title: string,
  data: Ref<JSC.JSCSeriesConfig>,
  range: JSC.Range
): JSC.JSCChartConfig => ({
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
