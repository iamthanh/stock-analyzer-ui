import { FC, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { SymbolDailyDataType } from "../../../types/symbolData.types";
import { TrendDetectionDataType } from "../../../types/trendDetection.types";

type CandlestickChartProps = {
  symbol: string;
  dateKeys: Array<string>;
  symbolData: { [key: string]: SymbolDailyDataType };
  symbolToolsData: { [key: string]: any } | null;
};

type CandlestickChartDataType = Array<number | string>;

const CandlestickChart: FC<CandlestickChartProps> = ({ symbol, dateKeys, symbolData, symbolToolsData }) => {
  let chartData;
  let volumes;

  let highlightMarkAreas: Array<Array<{ xAxis: string }>> = [];

  const transformTrendDetectionIntoChartMarkAreas = (trendData: TrendDetectionDataType[]) => {
    return trendData.map((trend: TrendDetectionDataType) => [{ xAxis: trend.startDate }, { xAxis: trend.endDate }]);
  };

  const transformDataForChart = (): CandlestickChartDataType[] | undefined => {
    try {
      // Make sure that the dateKeys are sorted, oldest first
      const dates = dateKeys.sort((a, b) => a.localeCompare(b, "en", { ignorePunctuation: true }));
      return dates.map((date: string) => [symbolData[date].open, symbolData[date].close, symbolData[date].low, symbolData[date].high]);
    } catch (err) {
      console.log(err);
      console.error("there was an error trying to transform data");
    }
  };

  const transformVolumeForChart = () => {
    try {
      // Make sure that the dateKeys are sorted, oldest first
      const dates = dateKeys.sort((a, b) => a.localeCompare(b, "en", { ignorePunctuation: true }));
      return dates.map((date: string) => symbolData[date].volume);
    } catch (err) {
      console.log(err);
      console.error("there was an error trying to transform data");
    }
  };

  if ((dateKeys || []).length > 0 && symbolData) {
    const transformedData = transformDataForChart();
    if (transformedData) {
      chartData = transformedData;
      volumes = transformVolumeForChart();
    }

    if (symbolToolsData) {
      // Handle highlighting of sections for trend detection
      if ("trendDetection" in symbolToolsData && (symbolToolsData.trendDetection || []).length > 0) {
        const transformedTrendAreas = transformTrendDetectionIntoChartMarkAreas(symbolToolsData.trendDetection);
        if (transformedTrendAreas && transformedTrendAreas.length > 0) {
          highlightMarkAreas = transformedTrendAreas;
        }
      }
    }
  }

  const renderChart = useMemo(
    () => (
      <ReactECharts
        style={{ height: "100vh" }}
        option={{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
          },
          axisPointer: {
            link: [
              {
                xAxisIndex: "all",
              },
            ],
            label: {
              backgroundColor: "#777",
            },
          },
          legend: {
            show: false,
            data: [symbol],
          },
          grid: [
            {
              left: "5%",
              right: "5%",
              height: "65%",
            },
            {
              left: "5%",
              right: "5%",
              top: "63%",
              height: "16%",
            },
          ],
          xAxis: [
            {
              type: "category",
              data: dateKeys,
              scale: true,
              gridIndex: 0,
              boundaryGap: false,
              splitLine: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              axisLabel: { show: false },
              // axisLine: {
              //   onZero: false,
              // },
              // splitLine: {
              //   show: false,
              // },
              splitNumber: 20,
              min: "dataMin",
              max: "dataMax",
            },
            {
              type: "category",
              gridIndex: 1,
              data: dateKeys,
              boundaryGap: false,
              axisLine: { onZero: false },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false },
              min: "dataMin",
              max: "dataMax",
            },
          ],
          yAxis: [
            {
              scale: true,
              gridIndex: 0,
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false },
            },
          ],
          dataZoom: [
            {
              type: "inside",
              start: 50,
              end: 100,
            },
            {
              show: true,
              xAxisIndex: [0, 1],
              type: "inside",
              top: "85%",
              start: 50,
              end: 100,
            },
          ],
          series: [
            {
              name: symbol,
              type: "candlestick",
              data: chartData,
              itemStyle: {
                color: "#0ead69",
                color0: "#ee4266",
                borderColor: null,
                borderColor0: null,
              },
              markArea: {
                itemStyle: {
                  color: "rgba(136,231,136,0.3)",
                },
                data: highlightMarkAreas,
              },
            },
            {
              name: "Volume",
              type: "bar",
              data: volumes,
              xAxisIndex: 1,
              yAxisIndex: 1,
            },
          ],
        }}
      />
    ),
    [highlightMarkAreas, chartData, volumes]
  );

  return renderChart;
};

export default CandlestickChart;
