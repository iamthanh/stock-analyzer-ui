import { type Navigation } from "@toolpad/core/AppProvider";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";

const navigation: Navigation = [
  {
    segment: "explorer",
    title: "Explorer",
    icon: <TravelExploreIcon />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <InsertChartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics tools",
  },
  {
    segment: "tools",
    title: "Tools",
    icon: <BarChartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Account",
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

export default navigation;
