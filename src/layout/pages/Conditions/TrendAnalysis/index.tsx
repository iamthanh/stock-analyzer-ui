import Grid from "@mui/material/Grid2";

import { useCallback, useMemo } from "react";
import StackBarNormalizationChart from "../../../../common/components/charts/StackBarNormalizationChart";
import UseGetTrendAnalysis from "../../../../services/api/dynamicConditions/UseGetTrendAnalysis";
import { Alert, Box, Card, CardContent, CircularProgress } from "@mui/material";

export const ConditionsTrendAnalysisPage = () => {
  const { data: trendAnalysisData, isLoading, isPending, error } = UseGetTrendAnalysis({ enabled: true });

  const renderChartsByType = useCallback(
    (type: string) => {
      if (trendAnalysisData && trendAnalysisData.data && trendAnalysisData.data[type]) {
        return (
          <Grid size={6}>
            <Card sx={{ bgcolor: "white" }}>
              <CardContent>
                <StackBarNormalizationChart key={type} type={type} data={trendAnalysisData.data[type]} />
              </CardContent>
            </Card>
          </Grid>
        );
      }
    },
    [trendAnalysisData]
  );

  const renderAllTypes = useMemo(() => {
    if (trendAnalysisData && Object.keys(trendAnalysisData.data).length > 0) {
      return Object.keys(trendAnalysisData.data).map((type: string) => renderChartsByType(type));
    }
  }, [trendAnalysisData]);

  if (isLoading || isPending) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Alert severity="error">Sorry, there's an error loading data</Alert>
      </Box>
    );
  }

  if (trendAnalysisData) {
    return (
      <Box padding={5}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {renderAllTypes}
        </Grid>
      </Box>
    );
  }

  return "no data";
};
