import { List, ListItem } from "@mui/material";
import React, { useContext } from "react";
import CartContext from "../store/cart-context";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  return cartCtx.items.length ? (
    <>
      <List className={styles.cart}>
        {cartCtx.items.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </List>
      <div className={styles["cart-footer"]}>
        <div className={styles["total-price"]}>
          <p>Total Price: </p>
          <div className={styles.price}>₪{cartCtx.totalPrice}</div>
        </div>
        <button className={`btn ${styles["checkout-btn"]}`}>Order Now</button>
      </div>
    </>
  ) : (
    <List className={styles.cart}>
      <ListItem className={styles.empty}>Your cart is empty</ListItem>
    </List>
  );
};
export default Cart;
