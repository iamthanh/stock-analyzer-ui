import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UseGetSymbolData from "../../../services/api/symbol/useGetSymbolData";
import { Alert } from "@mui/material";
import CandlestickChart from "./CandlestickChart";
import { ExplorerToolsEnum } from "../../../types/explorer.types";
import { SymbolDailyDataType, SymbolResponseDataType } from "../../../types/symbolData.types";

type ChartWrapperProps = {
  symbol: string;
  dataType: string;
  options: { [key: string]: any };
  toolsEnabled: { [key in ExplorerToolsEnum]: boolean };
};

export const ChartWrapper = (props: ChartWrapperProps) => {
  const { symbol, dataType, options = {}, toolsEnabled } = props;

  const [symbolData, setSymbolData] = useState<{ [key: string]: SymbolDailyDataType } | null>(null);
  const [symbolToolsData, setSymbolToolsData] = useState<{ [key: string]: any } | null>(null);
  const [dateKeys, setDateKeys] = useState<Array<string>>([]);

  const { SymbolDataIsPending, SymbolDataHasError, SymbolDataResponse } = UseGetSymbolData({ symbol, dataType, options, toolsEnabled });

  useEffect(() => {
    if (!SymbolDataIsPending) {
      if (SymbolDataResponse) {
        if (SymbolDataResponse.status === "success" && SymbolDataResponse.data) {
          setSymbolData(SymbolDataResponse.data);
          setDateKeys(Object.keys(SymbolDataResponse.data));
          setSymbolToolsData(SymbolDataResponse.toolsData);
        }
      }
    }
  }, [SymbolDataResponse, SymbolDataIsPending]);

  if (SymbolDataIsPending) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (SymbolDataHasError) {
    return (
      <Box sx={{ display: "flex" }}>
        <Alert severity="error">Sorry, there's an error loading data</Alert>
      </Box>
    );
  }

  if (symbolData) {
    return <CandlestickChart symbol={symbol} symbolData={symbolData} dateKeys={dateKeys} symbolToolsData={symbolToolsData} />;
  }
};
