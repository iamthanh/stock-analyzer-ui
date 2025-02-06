export type DataQueryOptionsType = {
  [key: string]: any;
};

export enum ExplorerToolsEnum {
  trendDetection = "trendDetection",
}

export type ToolTypes = { [key in ExplorerToolsEnum]: {[key: string]: any} };