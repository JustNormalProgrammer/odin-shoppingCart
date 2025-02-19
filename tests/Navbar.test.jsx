import {describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Navbar from "../src/Components/Navbar/Navbar";
import CartContextProvider from "../src/Contexts/CartContext";
import userEvent from "@testing-library/user-event";

describe("Navbar component", () => {
    
    it("renders correct links", () => {
        const {getByText, getByAltText} = render(<BrowserRouter><CartContextProvider><Navbar/></CartContextProvider></BrowserRouter>);
        expect(getByText("Home")).toBeInTheDocument();
        expect(getByText("Shop")).toBeInTheDocument();
        expect(getByAltText("Cart")).toBeInTheDocument();
    })
    it("adds style when user clicks the link", async () => {
        const user = userEvent.setup();
        const {getByText} = render(<BrowserRouter><CartContextProvider><Navbar/></CartContextProvider></BrowserRouter>);

        const shopLink = getByText("Shop");

        await user.click(shopLink);

        expect(shopLink).toHaveClass('active');
    })
})