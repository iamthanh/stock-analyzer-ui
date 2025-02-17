import { Route, Routes } from "react-router";
import { ExplorerPage } from "../Explorer";
import { HomePage } from "../Home";
import { Box } from "@mui/material";
import { ConditionsTrendAnalysisPage } from "../Conditions/TrendAnalysis";

const WithRoutes = () => {
  return (
    <Box sx={{ bgcolor: "white" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/reports/trend-analysis" element={<ConditionsTrendAnalysisPage />} />
      </Routes>
    </Box>
  );
};

export default WithRoutes;
