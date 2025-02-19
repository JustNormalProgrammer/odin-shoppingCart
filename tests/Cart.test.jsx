import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import Shoppage from "../src/Components/Shoppage/Shoppage";
import userEvent from "@testing-library/user-event";
import Cart from "../src/Components/Cart/Cart";
import App from "../src/App";
import Homepage from "../src/Components/HomePage/Homepage";

Object.defineProperty(window.SVGElement.prototype, "getBBox", {
    writable: true,
    value: vi.fn().mockReturnValue({
      x: 0,
      y: 0,
    }),
  });

beforeEach(async () => {
    const user = userEvent.setup();
        render(
          <MemoryRouter initialEntries={['/shop']}>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Homepage />}></Route>
                  <Route path="shop" element={<Shoppage />}></Route>
                  <Route path="shop/cart" element={<Cart />}></Route>
                </Route>
              </Routes>
          </MemoryRouter>
        );
        await screen.findByText("Mens Casual Premium Slim Fit T-Shirts");
        const addToCartBtn = screen.getAllByAltText("Add to cart")[1];
        const addToCartBtn1 = screen.getAllByAltText("Add to cart")[2];
        await user.click(addToCartBtn);
        await user.click(addToCartBtn1);
        const cartNavBtn = screen.getByAltText("Cart");
        await user.click(cartNavBtn);
})

describe("Cart component", () => {
    it("displays added items in cart", async () => {
        expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument();
        expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();
      });
    it("displayes correct total amount", () => {
        expect(screen.getByText("78.29$")).toBeInTheDocument();
    })
    it("deletes item in cart after clicking the delete button", async () =>{
        const user = userEvent.setup();
        const deleteBtn = screen.getAllByLabelText("Delete")[0];
        await user.click(deleteBtn);
        expect(screen.queryByText("Mens Casual Premium Slim Fit T-Shirts")).not.toBeInTheDocument();
    })
    it("clicking the button to increase quantity changes the input field and total amount accordingly", async () => {
        const user = userEvent.setup();
        const increaseQtyBtn = screen.getAllByAltText("Add item")[0];
        const inputField = screen.getAllByDisplayValue(1)[0];
        expect(inputField).toHaveDisplayValue("1");
        await user.click(increaseQtyBtn);
        expect(screen.getByText("100.59$")).toBeInTheDocument();
        expect(screen.getByDisplayValue(2)).toBeInTheDocument();
    })
})

