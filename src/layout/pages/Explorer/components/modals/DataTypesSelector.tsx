import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { ExplorerToolsEnum, ToolTypes } from "../../../../../types/explorer.types";
import { TrendDetectionDataTool } from "../dataTools/TrendDetection";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import clone from "lodash/clone";
import unset from "lodash/unset";

type DataTypesSelectorProps = {};

export const DataTypesSelector = ({}: DataTypesSelectorProps) => {
  const [editingDataTypes, setEditingDataTypes] = useState<any>([
    {
      type: "daily",
      seriesType: "close",
      displayType: "candlestick",
    },
  ]);

  const renderDataTypesContent = useMemo(
    () => (
      <Grid container spacing={2}>
        <Grid size={1}>
          <Checkbox
            aria-label="Enabled"
            checked={isToolEnabled(ExplorerToolsEnum.trendDetection)}
            onChange={(e) => {
              setEditingToolsEnabled((prev: Partial<ToolTypes>) => {
                const toSet = clone(prev);
                if (e.target.checked) {
                  toSet[ExplorerToolsEnum.trendDetection] = {};
                } else {
                  unset(toSet, ExplorerToolsEnum.trendDetection);
                }
                return toSet;
              });
            }}
          />
        </Grid>
        <TrendDetectionDataTool editingToolsEnabled={editingToolsEnabled} setEditingToolsEnabled={setEditingToolsEnabled} />
      </Grid>
    ),
    [editingToolsEnabled, open]
  );

  return (
    <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Data Tools
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{renderDataTypesContent}</DialogContent>

      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            // saveChangesHandler();
            // setOpen(false);
          }}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
