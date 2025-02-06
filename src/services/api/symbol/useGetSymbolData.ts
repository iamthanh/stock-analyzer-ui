import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

type UseGetSymbolDataProps = {
  symbol: string;
  dataType: string;
  options: { [key: string]: any };
};

const UseGetSymbolData = ({ symbol, dataType, options = {} }: UseGetSymbolDataProps) => {
  const queryToSet = {
    ...options,
    ...{
      limit: 250,
    },
  };

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["symbol", "UseGetData", symbol, JSON.stringify(options)],
    queryFn: () => fetch(`http://localhost:3001/api/data/symbol/${symbol}/${dataType}?${queryString.stringify(queryToSet)}`).then((res) => res.json()),
  });

  return {
    isPending,
    error,
    data,
    isLoading,
  };
};

export default UseGetSymbolData;
