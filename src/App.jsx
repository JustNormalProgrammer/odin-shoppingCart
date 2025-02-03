import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import CartContextProvider from "./Contexts/CartContext";
function App() {
  return (
    <>
      <CartContextProvider>
        <Navbar />
        <Outlet />
      </CartContextProvider>
    </>
  );
}

export default App;
