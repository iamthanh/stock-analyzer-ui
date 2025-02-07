import React, { useEffect, useMemo, useState } from "react";
import { ChartWrapper } from "../../../common/components/charts/ChartWrapper";
import { Box, Button, Stack } from "@mui/material";

import ConstructionIcon from "@mui/icons-material/Construction";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { DataQueryOptionsType, ToolTypes } from "../../../types/explorer.types";
import { DataToolsModal } from "./components/modals/DataToolsModal";
import { SymbolSelectorModal } from "./components/modals/SymbolSelectorModal";

export const ExplorerPage = () => {
  const [symbol, setSymbol] = useState<string>("A");
  const [dataTypes, setDataTypes] = useState<Array<string>>(["daily"]);
  const [dataQueryOptions, setDataQueryOptions] = useState<DataQueryOptionsType>({});
  const [toolsEnabled, setToolsEnabled] = useState<Partial<ToolTypes>>({});

  const [dataToolsModalOpen, setDataToolsModalOpen] = useState<boolean>(false);
  const [symbolSelectorModalOpen, setSymbolSelectorModalOpen] = useState<boolean>(false);

  const renderChartWrapper = useMemo(() => <ChartWrapper symbol={symbol} dataType={"daily"} options={{}} toolsEnabled={toolsEnabled} />, [symbol, toolsEnabled]);

  useEffect(() => {
    console.log(symbolSelectorModalOpen);
  }, [symbolSelectorModalOpen]);

  return (
    <>
      <Box component="section" sx={{ bgcolor: "#000000", p: 2, borderBottom: "1px solid grey" }}>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" startIcon={<QueryStatsIcon />} onClick={() => setSymbolSelectorModalOpen(true)}>
            Symbol: {symbol}
          </Button>
          <Button variant="outlined" startIcon={<DataObjectIcon />}>
            Data Types
          </Button>
          <Button variant="outlined" startIcon={<ConstructionIcon />} onClick={() => setDataToolsModalOpen(true)}>
            Tools
          </Button>
        </Stack>
      </Box>
      {renderChartWrapper}

      {dataToolsModalOpen && <DataToolsModal open={dataToolsModalOpen} setOpen={setDataToolsModalOpen} toolsEnabled={toolsEnabled} setToolsEnabled={setToolsEnabled} />}
      {symbolSelectorModalOpen && <SymbolSelectorModal open={symbolSelectorModalOpen} setOpen={setSymbolSelectorModalOpen} setSymbol={setSymbol} />}
    </>
  );
};
