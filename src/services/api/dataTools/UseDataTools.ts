import { ExplorerToolsEnum } from "../../../types/explorer.types";
import UseGetTrendDetectionData from "./UseGetTrendDetectionData";
import { useCallback, useEffect, useState } from "react";

type UseDataToolsDataProps = {
  symbol: string;
  toolsEnabled: { [key: string]: any };
};

const UseDataToolsData = ({ symbol, toolsEnabled }: UseDataToolsDataProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isToolEnabled = useCallback((toolKey: ExplorerToolsEnum) => toolKey in toolsEnabled, [toolsEnabled]);

  const {
    isPending: TrendDetectionIsPending,
    error: TrendDetectionHasError,
    data: TrendDetectionDataResponse,
  } = UseGetTrendDetectionData({ enabled: isToolEnabled(ExplorerToolsEnum.trendDetection), symbol, settings: toolsEnabled[ExplorerToolsEnum.trendDetection] });

  useEffect(() => {
    if (toolsEnabled) {
      for (let tool of Object.keys(responseData)) {
        if (!isToolEnabled(tool)) {
          let removed = { ...responseData };
          delete removed[tool];
          setResponseData(removed);
        }
      }
    }
  }, [toolsEnabled]);

  useEffect(() => {
    if (!TrendDetectionIsPending && TrendDetectionDataResponse) {
      if (TrendDetectionDataResponse.status === "success" && TrendDetectionDataResponse.data) {
        setResponseData((prev: any) => ({ ...prev, [ExplorerToolsEnum.trendDetection]: TrendDetectionDataResponse.data }));
      }
    }
  }, [TrendDetectionIsPending, TrendDetectionDataResponse, toolsEnabled]);

  return { isPending, hasError, responseData, isLoading };
};

export default UseDataToolsData;
