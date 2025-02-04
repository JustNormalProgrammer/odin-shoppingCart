import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(0);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.any,
};
