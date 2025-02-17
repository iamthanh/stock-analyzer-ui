import { FC, useMemo } from "react";
import ReactECharts from "echarts-for-react";

type StackBarNormalizationChartProps = {
  data: any;
  type: string;
};

type CandlestickChartDataType = Array<number | string>;

const StackBarNormalizationChart: FC<StackBarNormalizationChartProps> = ({ data, type }) => {
  return (
    <ReactECharts
      option={{
        title: { text: type },
        tooltip: {
          confine: "true",
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: { show: false },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: data.xAxisKeys,
        },
        yAxis: {
          type: "value",
        },
        series: data.seriesData,
      }}
    />
  );
};

export default StackBarNormalizationChart;
