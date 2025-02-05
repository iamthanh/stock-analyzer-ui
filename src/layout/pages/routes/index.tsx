import { Route, Routes } from "react-router";
import { ExplorerPage } from "../Explorer";
import { HomePage } from "../Home";
import { Box } from "@mui/material";

const WithRoutes = () => {
  return (
    <Box sx={{ bgcolor: "white" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explorer" element={<ExplorerPage />} />
      </Routes>
    </Box>
  );
};

export default WithRoutes;
