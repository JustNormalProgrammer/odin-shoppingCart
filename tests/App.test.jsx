import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";

const HomePage = () => <h1>HomePage</h1>;
const ShopPage = () => <h1>ShopPage</h1>;
const Cart = () => <h1>CartPage</h1>;

describe("App componenent", () => {
  it("match snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("renders homepage", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="shop" element={<ShopPage />}></Route>
            <Route path="shop/cart" element={<Cart />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", {name: "HomePage"})).toBeInTheDocument();
  });
  it("renders correct page when user clicks the shop link", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="shop" element={<ShopPage />}></Route>
            <Route path="shop/cart" element={<Cart />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const shop = screen.getByText("Shop");
    await user.click(shop);
    expect(
      screen.getByRole("heading", { name: "ShopPage" })
    ).toBeInTheDocument();
  });
  it("renders cart page when link is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="shop" element={<ShopPage />}></Route>
            <Route path="shop/cart" element={<Cart />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const cart = screen.getByAltText("Cart");
    await user.click(cart);
    expect(
      screen.getByRole("heading", { name: "CartPage" })
    ).toBeInTheDocument();
  });
});
