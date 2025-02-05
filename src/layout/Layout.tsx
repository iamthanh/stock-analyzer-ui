import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import WithRoutes from "./pages/routes";
import LayoutTheme from "./themes/default";
import navigation from "./navigation";

export default function DashboardLayoutBasic() {
  return (
    <AppProvider navigation={navigation} theme={LayoutTheme} window={window}>
      <DashboardLayout>
        <WithRoutes />
      </DashboardLayout>
    </AppProvider>
  );
}
