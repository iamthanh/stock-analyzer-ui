import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UseGetSymbolData from "../../../services/api/symbol/useGetSymbolData";
import { Alert } from "@mui/material";
import CandlestickChart from "./CandlestickChart";
import { ExplorerToolsEnum, ToolTypes } from "../../../types/explorer.types";
import { SymbolDailyDataType, SymbolResponseDataType } from "../../../types/symbolData.types";
import UseGetTrendDetectionData from "../../../services/api/dataTools/UseGetTrendDetectionData";
import UseDataToolsData from "../../../services/api/dataTools/UseDataTools";
import { clone, set } from "lodash";

type ChartWrapperProps = {
  symbol: string;
  dataType: string;
  options: { [key: string]: any };
  toolsEnabled: Partial<ToolTypes>;
};

export const ChartWrapper = (props: ChartWrapperProps) => {
  const { symbol, dataType, options = {}, toolsEnabled } = props;

  const [symbolData, setSymbolData] = useState<{ [key: string]: SymbolDailyDataType } | null>(null);
  const [symbolToolsData, setSymbolToolsData] = useState<{ [key: string]: any } | null>(null);
  const [dateKeys, setDateKeys] = useState<Array<string>>([]);

  const { isPending: SymbolDataIsPending, error: SymbolDataHasError, data: SymbolDataResponse } = UseGetSymbolData({ symbol, dataType, options });
  const { isPending: DataToolsDataIsPending, hasError: DataToolsDataHasError, responseData: DataToolsDataResponse } = UseDataToolsData({ symbol, toolsEnabled });

  // useEffect(() => {
  //   if (DataToolsDataResponse) {
  //     console.log(DataToolsDataResponse);
  //     if (DataToolsDataResponse.status === "success" && DataToolsDataResponse.data) {
  //       setSymbolToolsData((prev: any) => set(clone(prev), [ExplorerToolsEnum.trendDetection], DataToolsDataResponse.data));
  //     }
  //   }
  // }, [DataToolsDataResponse]);

  useEffect(() => {
    console.log(DataToolsDataResponse);
  }, [DataToolsDataResponse]);

  useEffect(() => {
    console.log(toolsEnabled);
  }, [toolsEnabled]);

  useEffect(() => {
    if (SymbolDataResponse) {
      if (SymbolDataResponse.status === "success" && SymbolDataResponse.data) {
        setSymbolData(SymbolDataResponse.data);
        setDateKeys(Object.keys(SymbolDataResponse.data));
      }
    }
  }, [SymbolDataResponse]);

  if (SymbolDataIsPending || DataToolsDataIsPending) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (SymbolDataHasError || DataToolsDataHasError) {
    return (
      <Box sx={{ display: "flex" }}>
        <Alert severity="error">Sorry, there's an error loading data</Alert>
      </Box>
    );
  }

  if (symbolData) {
    return <CandlestickChart symbol={symbol} symbolData={symbolData} dateKeys={dateKeys} symbolToolsData={DataToolsDataResponse} />;
  }
};
