import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UseGetSymbolData from "../../../services/api/symbol/useGetSymbolData";
import { Alert } from "@mui/material";
import CandlestickChart from "./CandlestickChart";

type ChartWrapperProps = {
  symbol: string;
  dataType: string;
  options: { [key: string]: any };
};

export const ChartWrapper = (props: ChartWrapperProps) => {
  const { symbol, dataType, options = {} } = props;

  const { SymbolDataIsPending, SymbolDataHasError, SymbolDataResponse } = UseGetSymbolData({ symbol, dataType, options });

  const [symbolData, setSymbolData] = useState<any>(null);
  const [dateKeys, setDateKeys] = useState<Array<string>>([]);

  useEffect(() => {
    if (!SymbolDataIsPending) {
      if (SymbolDataResponse) {
        if (SymbolDataResponse.status === "success" && SymbolDataResponse.data) {
          setSymbolData(SymbolDataResponse.data);
          setDateKeys(Object.keys(SymbolDataResponse.data));
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

  return <CandlestickChart symbol={symbol} symbolData={symbolData} dateKeys={dateKeys} />;
};
