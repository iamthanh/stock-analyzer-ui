import { useQuery } from "@tanstack/react-query";

type UseGetSymbolDataProps = {
  enabled: boolean;
};

const UseGetTrendAnalysis = ({ enabled }: UseGetSymbolDataProps) => {
  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["dataTools", "UseGetTrendDetectionData"],
    queryFn: () => fetch(`http://localhost:3001/api/dynamic-conditions/results-by-trends`).then((res) => res.json()),
    enabled: enabled,
  });

  return { isPending, error, data, isLoading };
};

export default UseGetTrendAnalysis;
