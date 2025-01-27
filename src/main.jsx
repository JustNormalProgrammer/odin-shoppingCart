import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./Components/HomePage/Homepage.jsx";
import ShopPage from "./Components/Shoppage/Shoppage.jsx";
import Cart from "./Components/Cart/Cart.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="shop" element={<ShopPage />}>
          </Route>
          <Route path="shop/cart" element={<Cart />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
