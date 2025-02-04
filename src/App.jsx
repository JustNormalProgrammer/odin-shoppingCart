import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import CartContextProvider from "./Contexts/CartContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
function App() {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Navbar />
          <Outlet />
        </CartContextProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  );
}

export default App;
