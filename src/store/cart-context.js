import React from "react";
const defaultCartItem = {
  id: "",
  title: "",
  description: "",
  price: 0,
  category: "",
};
const CartContext = React.createContext({
  items: [defaultCartItem],
  totalPrice: 0,
  increment: (cartItem) => {},
  decrement: (cartItemId, decrementAmount) => {},
  change: (cartItem) => {},
  remove: (cartItemId) => {},
});

export default CartContext;
