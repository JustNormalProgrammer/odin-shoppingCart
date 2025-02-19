import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import { render, waitFor } from "@testing-library/react";
import CartContextProvider from "../src/Contexts/CartContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import Shoppage from "../src/Components/Shoppage/Shoppage";
import Navbar from "../src/Components/Navbar/Navbar";
import server from "./server";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";

Object.defineProperty(window.SVGElement.prototype, "getBBox", {
  writable: true,
  value: vi.fn().mockReturnValue({
    x: 0,
    y: 0,
  }),
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const queryClient = new QueryClient();

const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>{children}</CartContextProvider>
    </QueryClientProvider>
  );
};
Wrapper.propTypes = {
  children: PropTypes.any,
}

describe("Shoppage component", () => {
  it("renders shoppage component with skeleton loaders", () => {
    const { container } = render(<Shoppage />, { wrapper: Wrapper });
    expect(container).toMatchSnapshot();
  });
  it("renders categories of shop items when data fetching is completed", async () => {
    const { findByText } = render(<Shoppage />, { wrapper: Wrapper });
    expect(await findByText("electronics")).toBeInTheDocument();
    expect(await findByText("jewelery")).toBeInTheDocument();
    expect(await findByText("men's clothing")).toBeInTheDocument();
    expect(await findByText("women's clothing")).toBeInTheDocument();
  });
  it("renders shop items", async () => {
    const { findByText } = render(<Shoppage />, { wrapper: Wrapper });
    expect(
      await findByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    ).toBeInTheDocument();
    expect(
      await findByText("Mens Casual Premium Slim Fit T-Shirts")
    ).toBeInTheDocument();
    expect(await findByText("Mens Cotton Jacket")).toBeInTheDocument();
  });
  it("renders only shop items matching selected category", async () => {
    const user = userEvent.setup();
    const { findByText, getByText, queryByText } = render(<Shoppage />, {
      wrapper: Wrapper,
    });
    const categoryButton = await findByText("jewelery");
    await user.click(categoryButton);
    expect(
      getByText(
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet"
      )
    ).toBeInTheDocument();
    expect(
      queryByText("Mens Casual Premium Slim Fit T-Shirts")
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive"
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText("Rain Jacket Women Windbreaker Striped Climbing Raincoats")
    ).not.toBeInTheDocument();
  });
  it("renders input field with initial value of quantity of 1", async () => {
    const { getAllByDisplayValue, findAllByAltText } = render(<Shoppage />, {
      wrapper: Wrapper,
    });
    await findAllByAltText("Add item")[0];
    const inputField = getAllByDisplayValue(1)[0];
    expect(inputField).toBeVisible();
    expect(inputField).toHaveValue("1");
  });
  it("changes the value of quantity field after user click", async () => {
    const user = userEvent.setup();
    const { getAllByAltText, getAllByDisplayValue } = render(<Shoppage />, {
      wrapper: Wrapper,
    });
    await waitFor(async () => {
      expect(getAllByAltText("Add item")[0]).toBeVisible();
    });
    const addItemBtn = getAllByAltText("Add item")[1];
    await user.click(addItemBtn);
    expect(getAllByDisplayValue(2)[0]).toBeInTheDocument();
  });
  it("changes the value of quantity of the cart in the navbar when user adds item to the cart", async () => {
    const user = userEvent.setup();
    const { getAllByAltText, getByText} = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <Navbar/>
            <Shoppage />
          </CartContextProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    await waitFor(async () => {
      expect(getAllByAltText("Add item")[0]).toBeVisible();
    });
    const addtoCartButton = getAllByAltText("Add to cart")[0];
    expect(getByText("0")).toBeInTheDocument();
    await user.click(addtoCartButton);
    expect(getByText("1")).toBeInTheDocument();
    await user.click(addtoCartButton);
    expect(getByText("2")).toBeInTheDocument();
  });
});
