import { useReducer /* , useState */ } from "react";
import CartContext from "./cart-context";

const cartInitialState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      let totalPrice = state.totalPrice;

      if (state.items.length) {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedCartItems;
        if (existingCartItem) {
          totalPrice = totalPrice - existingCartItem.quantity * existingCartItem.price + action.item.quantity * action.item.price;
          updatedCartItems = [...state.items];
          const updatedCartItem = {
            ...existingCartItem,
            quantity: action.item.quantity,
          };
          updatedCartItems[existingCartItemIndex] = updatedCartItem;
        } else {
          totalPrice += action.item.quantity * action.item.price;
          updatedCartItems = [...state.items, action.item];
        }
        return { items: updatedCartItems, totalPrice };
      }
      totalPrice += action.item.quantity * action.item.price;
      return { items: [action.item], totalPrice };
    }

    case "DECREMENT": {
      let totalPrice = state.totalPrice;
      const updatedCartItems = state.items.map((item) => {
        if (item.id === action.id) {
          totalPrice -= item.price * action.decrementAmount;
          return { ...item, quantity: item.quantity - action.decrementAmount };
        }
        return item;
      });
      return { items: updatedCartItems, totalPrice };
    }

    case "CHANGE": {
      let totalPrice = state.totalPrice;
      const updatedCartItems = state.items.map((item) => {
        if (item.id === action.item.id) {
          totalPrice = totalPrice - item.quantity + action.item.quantity;
          return { ...item, quantity: action.item.quantity };
        }
        return item;
      });
      return { items: updatedCartItems, totalPrice };
    }

    case "REMOVE": {
      let totalPrice = state.totalPrice;
      const updatedCartItems = state.items.filter((item) => {
        if (item.id !== action.id) {
          return true;
        }
        totalPrice -= item.price * item.quantity;
        return false;
      });
      return { items: updatedCartItems, totalPrice };
    }
    default: {
      return cartInitialState;
    }
  }
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  const addItemToCartHandler = (item) => {
    cartDispatch({ type: "ADD", item });
  };
  const decreaseCartItemHandler = (id, decrementAmount) => {
    cartDispatch({ type: "DECREMENT", id, decrementAmount });
  };
  const changeCartItemHandler = (item) => {
    cartDispatch({ type: "CHANGE", item });
  };
  const removeItemFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE", id });
  };
  // const [cart, setCart] = useState(cartInitialState);

  // const updateCartHandler = (item) => {
  //   let totalPrice = cart.totalPrice;
  //   if (cart.items.length) {
  //     const existingCartItemIndex = cart.items.findIndex(
  //       (cartItem) => cartItem.id === item.id
  //     );
  //     const existingCartItem = cart.items[existingCartItemIndex];
  //     if (existingCartItem) {
  //       if (item.quantity === 0) {
  //         totalPrice -= existingCartItem.price * existingCartItem.quantity;
  //         setCart((prevCart) => {
  //           const updatedCartItems = prevCart.items.filter(
  //             (cartItem) => cartItem.id !== item.id
  //           );
  //           return { ...cart, items: updatedCartItems, totalPrice };
  //         });
  //         return;
  //       }
  //       console.log(totalPrice, existingCartItem.price, existingCartItem.quantity, item.price, item.quantity);
  //       totalPrice =
  //       totalPrice -
  //       existingCartItem.price * existingCartItem.quantity +
  //       item.price * item.quantity;
  //       console.log(totalPrice);
  //       setCart((prevCart) => {
  //         const updatedCartItems = prevCart.items.map((cartItem) =>
  //           cartItem.id === item.id
  //             ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
  //             : cartItem
  //         );
  //         return { ...cart, items: updatedCartItems, totalPrice };
  //       });
  //       return;
  //     }
  //     setCart((prevCart) => {
  //       const updatedCartItems = [...prevCart.items, item];
  //       totalPrice = prevCart.totalPrice + item.price * item.quantity;
  //       return {
  //         ...cart,
  //         items: updatedCartItems,
  //         totalPrice,
  //       };
  //     });
  //     return;
  //   }
  //   setCart({ ...cart, items: [item], totalPrice: item.price * item.quantity });
  // };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    increment: addItemToCartHandler,
    decrement: decreaseCartItemHandler,
    change: changeCartItemHandler,
    remove: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
