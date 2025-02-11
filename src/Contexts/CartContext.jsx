import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CartValueContext = createContext(null);
export const CartSetContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartValueContext.Provider value={cart}>
      <CartSetContext.Provider value={setCart}>
        {children}
      </CartSetContext.Provider>
    </CartValueContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.any,
};
