import { useQuery } from "@tanstack/react-query"

type UseGetSymbolDataProps ={
  symbol: string
  dataType: string
  options: {[key: string]: any}
}

const UseGetSymbolData= ({ symbol, dataType, options = {} }: UseGetSymbolDataProps) => {

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ['symbol', 'UseGetData', symbol],
    queryFn: () =>
      fetch(`http://localhost:3001/api/symbol/${symbol}/${dataType}?limit=1000`).then((res) =>
        res.json(),
      ),
  })

  return {
    SymbolDataIsPending: isPending, 
    SymbolDataHasError: error, 
    SymbolDataResponse: data, 
    SymbolDataIsLoading: isLoading 
   }

}

export default UseGetSymbolData