import { JSC } from "jscharting-vue";
import { Ref } from "vue";

export const createSeries = (
  name: string,
  text: string
): JSC.JSCSeriesConfig => ({
  name,
  defaultPoint_label: {
    visible: false,
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
      color: "white",
    },
  },
  palette: ["white"],
  legend_visible: false,
  xAxis: {
    scale: {
      type: "time",
    },
    defaultTick: {
      enabled: false,
    },
  },
  defaultPoint: {
    marker: {
      type: "none",
    },
  },
  yAxis: {
    alternateGridFill: ["transparent", false],
    defaultTick: {
      enabled: true,
    },
    scale: {
      range,
    },
    // line_color: "#eeeeee"
  },
  series: [data.value],
});
