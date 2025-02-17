import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import Chance from "chance";

import { useEffect, useMemo, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UseGetSymbolData from "../../../services/api/symbol/UseGetSymbolData";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Grid2, Typography } from "@mui/material";
import CandlestickChart from "./CandlestickChart";
import { ExplorerToolsEnum, ToolTypes } from "../../../types/explorer.types";
import { SymbolDailyDataType } from "../../../types/symbolData.types";
import UseDataToolsData from "../../../services/api/dataTools/UseDataTools";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type ChartWrapperProps = {
  symbol: string;
  dataType: string;
  options: { [key: string]: any };
  toolsEnabled: Partial<ToolTypes>;
};

export const ChartWrapper = (props: ChartWrapperProps) => {
  const { symbol, dataType, options = {}, toolsEnabled } = props;

  const [symbolData, setSymbolData] = useState<{ [key: string]: SymbolDailyDataType } | null>(null);
  const [dateKeys, setDateKeys] = useState<Array<string>>([]);

  const { isPending: SymbolDataIsPending, error: SymbolDataHasError, data: SymbolDataResponse } = UseGetSymbolData({ symbol, dataType, options });
  const { isPending: DataToolsDataIsPending, hasError: DataToolsDataHasError, responseData: DataToolsDataResponse } = UseDataToolsData({ symbol, toolsEnabled });

  interface TrendDetectionResultsDataInterface {
    startDate: string;
    endDate: string;
    periods: number;
    percentChange: number;
  }

  interface ColumnData {
    dataKey: keyof TrendDetectionResultsDataInterface;
    label: string;
    numeric?: boolean;
    width?: number;
  }

  const columns: ColumnData[] = [
    {
      label: "Start date",
      dataKey: "startDate",
    },
    {
      label: "Last Name",
      dataKey: "endDate",
    },
    {
      label: "Period",
      dataKey: "periods",
      numeric: true,
    },
    {
      label: "% Change",
      dataKey: "percentChange",
      numeric: true,
    },
  ];

  const rows: TrendDetectionResultsDataInterface[] = DataToolsDataResponse[ExplorerToolsEnum.trendDetection];

  const VirtuosoTableComponents: TableComponents<TrendDetectionResultsDataInterface> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
    Table: (props) => <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />,
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.dataKey} variant="head" align={column.numeric || false ? "right" : "left"} style={{ width: column.width }} sx={{ backgroundColor: "background.paper" }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: TrendDetectionResultsDataInterface) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={column.dataKey} align={column.numeric || false ? "right" : "left"}>
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  useEffect(() => {
    if (SymbolDataResponse) {
      if (SymbolDataResponse.status === "success" && SymbolDataResponse.data) {
        setSymbolData(SymbolDataResponse.data);
        setDateKeys(Object.keys(SymbolDataResponse.data));
      }
    }
  }, [SymbolDataResponse]);

  const renderTrendDetectionDetailsList = useMemo(() => {
    if (DataToolsDataResponse && ExplorerToolsEnum.trendDetection in DataToolsDataResponse) {
      return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            <Typography component="span">Trend detection results</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper style={{ height: "100vh", width: "100%" }}>
              <TableVirtuoso data={rows} components={VirtuosoTableComponents} fixedHeaderContent={fixedHeaderContent} itemContent={rowContent} />
            </Paper>
          </AccordionDetails>
        </Accordion>
      );
    }
  }, [DataToolsDataResponse]);

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
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <CandlestickChart symbol={symbol} symbolData={symbolData} dateKeys={dateKeys} symbolToolsData={DataToolsDataResponse} />
          </Grid2>
          <Grid2 size={4}>{renderTrendDetectionDetailsList}</Grid2>
        </Grid2>
      </Box>
    );
  }
};
