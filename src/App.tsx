import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
