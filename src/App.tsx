import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChartWrapper } from "./common/components/charts/ChartWrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ChartWrapper symbol={"A"} dataType={"daily"} options={{}} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
