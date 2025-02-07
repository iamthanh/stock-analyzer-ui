import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

type UseGetSymbolDataProps = {
  enabled: boolean;
  symbol: string;
  settings: { [key: string]: any } | null;
};

const UseGetTrendDetectionData = ({ enabled, symbol, settings = null }: UseGetSymbolDataProps) => {
  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["dataTools", "UseGetTrendDetectionData", symbol, JSON.stringify(settings)],
    queryFn: () => fetch(`http://localhost:3001/api/data-tools/trend-detection/${symbol}?${queryString.stringify(settings)}`).then((res) => res.json()),
    enabled: enabled,
  });

  return { isPending, error, data, isLoading };
};

export default UseGetTrendDetectionData;
