import { Dispatch, SetStateAction, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid2, TextField, Typography } from "@mui/material";
import { ExplorerToolsEnum, ToolTypes } from "../../../../../types/explorer.types";
import { clone, get, set } from "lodash";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type TrendDetectionDataToolProps = {
  editingToolsEnabled: Partial<ToolTypes>;
  setEditingToolsEnabled: Dispatch<SetStateAction<Partial<ToolTypes>>>;
};

export const TrendDetectionDataTool = ({ editingToolsEnabled, setEditingToolsEnabled }: TrendDetectionDataToolProps) => {
  const handleChanges = (type, value: Partial<ToolTypes>) => {
    setEditingToolsEnabled((prev) => {
      const toSet = clone(prev);
      set(toSet, [ExplorerToolsEnum.trendDetection, type], value);
      return toSet;
    });
  };

  return (
    <Grid2 size={11}>
      <Accordion key={ExplorerToolsEnum.trendDetection}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography component="span">{"Trend Detection"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography marginBottom={2}>Locates the upward trends on the symbol data and highlights them on the chart</Typography>
            <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}>
              <TextField
                label="Max periods"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                type="number"
                value={get(editingToolsEnabled, [ExplorerToolsEnum.trendDetection, "maxPeriods"], 7)}
                onChange={(e) => handleChanges("maxPeriods", e.target.value)}
              />
              <TextField
                label="Min percent change"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                type="number"
                value={get(editingToolsEnabled, [ExplorerToolsEnum.trendDetection, "minPercentChange"], 5)}
                onChange={(e) => handleChanges("minPercentChange", e.target.value)}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Grid2>
  );
};
