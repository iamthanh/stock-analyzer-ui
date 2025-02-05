import { useQuery } from "@tanstack/react-query"
import { ExplorerToolsEnum } from "../../../types/explorer.types"
import queryString from 'query-string';

type UseGetSymbolDataProps ={
  symbol: string
  dataType: string
  options: {[key: string]: any}
  toolsEnabled: { [key in ExplorerToolsEnum]: boolean }
}

const UseGetSymbolData= ({ symbol, dataType, options = {}, toolsEnabled }: UseGetSymbolDataProps) => {
  const queryToSet = {
    ...toolsEnabled,
    ...options,
    ...{
      limit: 250
    }
  }

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ['symbol', 'UseGetData', symbol, JSON.stringify(options), JSON.stringify(toolsEnabled)],
    queryFn: () =>
      fetch(`http://localhost:3001/api/symbol/${symbol}/${dataType}?${queryString.stringify(queryToSet)}`).then((res) =>
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