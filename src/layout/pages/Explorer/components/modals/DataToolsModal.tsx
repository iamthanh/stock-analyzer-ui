import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, TextField } from "@mui/material";
import { ExplorerToolsEnum, ToolTypes } from "../../../../../types/explorer.types";
import { TrendDetectionDataTool } from "../dataTools/TrendDetection";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import clone from "lodash/clone";
import unset from "lodash/unset";

type DataToolsModalProps = {
  toolsEnabled: Partial<ToolTypes>;
  setToolsEnabled: Dispatch<SetStateAction<Partial<ToolTypes>>>;
  open: boolean;
  setOpen: (args: boolean) => void;
};

export const DataToolsModal = ({ toolsEnabled, setToolsEnabled, open, setOpen }: DataToolsModalProps) => {
  const [editingToolsEnabled, setEditingToolsEnabled] = useState<Partial<ToolTypes>>(toolsEnabled);

  const isToolEnabled = useCallback((key: string) => key in (editingToolsEnabled || {}), [editingToolsEnabled]);

  const saveChangesHandler = () => setToolsEnabled(editingToolsEnabled);

  const renderTools = useMemo(
    () => (
      <Grid container spacing={2}>
        <Grid size={1}>
          <Checkbox
            aria-label="Enabled"
            checked={isToolEnabled(ExplorerToolsEnum.trendDetection)}
            onChange={(e) => {
              setEditingToolsEnabled((prev: Partial<ToolTypes>) => {
                let toSet = clone(prev);
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
      <DialogContent dividers>{renderTools}</DialogContent>

      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            saveChangesHandler();
            setOpen(false);
          }}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
