import { useState } from "react";
import { ChartWrapper } from "../../../common/components/charts/ChartWrapper";
import { Box, Button, Stack } from "@mui/material";

import ConstructionIcon from "@mui/icons-material/Construction";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { DataQueryOptionsType, ExplorerToolsEnum } from "../../../types/explorer.types";

export const ExplorerPage = () => {
  const [symbol, setSymbol] = useState<string>("A");
  const [dataTypes, setDataTypes] = useState<Array<string>>(["daily"]);
  const [dataQueryOptions, setDataQueryOptions] = useState<DataQueryOptionsType>({});
  const [toolsEnabled, setToolsEnabled] = useState<{ [key in ExplorerToolsEnum]: boolean }>({ [ExplorerToolsEnum.trendDetection]: true });

  return (
    <>
      <Box component="section" sx={{ bgcolor: "#000000", p: 2, borderBottom: "1px solid grey" }}>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" startIcon={<QueryStatsIcon />}>
            Symbol: {symbol}
          </Button>
          <Button variant="outlined" startIcon={<DataObjectIcon />}>
            Data Types
          </Button>
          <Button variant="outlined" startIcon={<ConstructionIcon />}>
            Tools
          </Button>
        </Stack>
      </Box>

      <ChartWrapper symbol={symbol} dataType={"daily"} options={{}} toolsEnabled={toolsEnabled} />
    </>
  );
};
