import { FC, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { SymbolDailyDataType } from "../../../types/symbolData.types";

type CandlestickChartProps = {
  symbol: string;
  dateKeys: Array<string>;
  symbolData: { [key: string]: SymbolDailyDataType };
};

type CandlestickChartDataType = {
  value: Array<number | string>;
};

const CandlestickChart: FC<CandlestickChartProps> = ({ symbol, dateKeys, symbolData }) => {
  let chartData;

  const transformDataForChart = (): CandlestickChartDataType[] | undefined => {
    try {
      // Make sure that the dateKeys are sorted, oldest first
      const dates = dateKeys.sort((a, b) => a.localeCompare(b, "en", { ignorePunctuation: true }));
      return dates.map((date: string) => ({
        value: [symbolData[date].open, symbolData[date].close, symbolData[date].low, symbolData[date].high, symbolData[date].volume],
        // itemStyle: {
        //   color: "transparent", // Hollow candle (upward movement)
        //   color0: "#ec0000", // Solid candle (downward movement)
        //   borderColor: "#00da3c", // Border for hollow candles (upward movement)
        //   borderColor0: "#ec0000", // Border for solid candles (downward movement)
        // },
      }));
    } catch (err) {
      console.log(err);
      console.error("there was an error trying to transform data");
    }
  };

  if ((dateKeys || []).length > 0 && symbolData) {
    const transformedData = transformDataForChart();
    if (transformedData) {
      chartData = transformedData;
    }
  }

  return (
    <ReactECharts
      style={{ height: "800px", width: "1000px" }}
      option={{
        backgroundColor: "white", // Remove background color
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: [symbol],
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          data: dateKeys,
          scale: true,
          boundaryGap: false,
          axisLine: {
            onZero: false,
          },
          splitLine: {
            show: false,
          },
          splitNumber: 20,
          min: "dataMin",
          max: "dataMax",
        },
        yAxis: {
          scale: true,
        },
        dataZoom: [
          {
            type: "inside",
            start: 50,
            end: 100,
          },
          {
            show: false,
            type: "slider",
            top: "90%",
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
              color: "green",
              color0: "red",
              borderColor: null,
              borderColor0: null,
            },
          },
        ],
      }}
    />
  );
};

export default CandlestickChart;
