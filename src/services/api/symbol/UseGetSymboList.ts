import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

type UseGetSymbolDataProps = {
  options?: { [key: string]: any };
};

const UseGetSymboList = ({ options = {} }: Partial<UseGetSymbolDataProps>) => {
  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["symbol", "UseGetSymboList", JSON.stringify(options)],
    queryFn: () => fetch(`http://localhost:3001/api/data/symbol/list?${queryString.stringify(options)}`).then((res) => res.json()),
  });

  return {
    isPending,
    error,
    data,
    isLoading,
  };
};

export default UseGetSymboList;
