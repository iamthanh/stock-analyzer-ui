import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import UseGetSymboList from "../../../../../services/api/symbol/UseGetSymboList";
import { TickerType } from "../../../../../types/tickers.types";

type DataToolsModalProps = {
  setSymbol: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: (args: boolean) => void;
};

export const SymbolSelectorModal = ({ open, setOpen, setSymbol }: DataToolsModalProps) => {
  const { isPending, data: symbolsListData } = UseGetSymboList({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getFilteredDataSet = useMemo(() => {
    if (symbolsListData && (symbolsListData.data || []).length > 0) {
      let filtered = symbolsListData.data;
      if (searchTerm.length > 0) {
        filtered = (symbolsListData.data || []).filter((symbol: TickerType) => `${symbol.ticker}${symbol.name}`.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return filtered;
    }

    return [];
  }, [symbolsListData, searchTerm]);

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton
          onClick={() => {
            setSymbol(getFilteredDataSet[index].ticker);
            setOpen(false);
          }}
        >
          <ListItemText primary={getFilteredDataSet[index].ticker} />
          <ListItemText secondary={getFilteredDataSet[index].name} />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderListSymbols = useMemo(() => {
    if (symbolsListData && (symbolsListData.data || []).length > 0) {
      return (
        <FixedSizeList height={750} width={550} itemSize={36} itemCount={getFilteredDataSet.length} overscanCount={5}>
          {renderRow}
        </FixedSizeList>
      );
    }
  }, [getFilteredDataSet]);

  return (
    <Dialog fullWidth onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Symbols
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

      <DialogContent dividers>
        {isPending ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TextField id="outlined-basic" label="Search symbols" variant="outlined" fullWidth margin="normal" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {renderListSymbols}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
