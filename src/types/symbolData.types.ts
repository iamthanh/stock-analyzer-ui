export type SymbolResponseDataType = {
  status: string,
  data: {[key: string]: SymbolDailyDataType}
  toolsData: {[key: string]: any}
}

export type SymbolDailyDataType = {
  close: number | string;
  high: number | string;
  low: number | string;
  open: number | string;
  transactions: number | string;
  volume: number | string;
  volumeWeightedAvgPrice: number | string;
};
