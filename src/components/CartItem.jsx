import { ListItem } from "@mui/material";
import { useContext/* , useState */ } from "react";
import CartContext from "../store/cart-context";
import styles from "./Cart.module.scss";

const CartItem = ({ item }) => {
  const cartCtx = useContext(CartContext);
  

  const qtyDecreaseHandler = () => {
    if (item.quantity === 1) {
      cartCtx.remove(item.id);
      return;
    };
    cartCtx.decrement(item.id, 1);
  };

  const qtyIncreaseHandler = () => {
    cartCtx.increment({...item, quantity: item.quantity + 1});
  };

  const qtyChangeHandler = (e) => {
    const newQty = Number(e.currentTarget.value);
    if(newQty === 0) {
      cartCtx.remove(item.id);
      return;
    }
    if (isNaN(newQty) || newQty < 0) return;
    cartCtx.change({...item, quantity: newQty});
  };

  const removeItemHandler = () => {
    cartCtx.remove(item.id);
  };

  return (
    <ListItem className={styles["cart-item"]}>
      <div className={styles["cart-item--image"]}>
        <img
          src={
            item.image ||
            "https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg"
          }
          alt={item.title}
        />
      </div>
      <div className={styles["cart-item--info"]}>
        <h3 className={styles.title}>{item.title} </h3>
        <div className={styles.price}>
          <div>₪{item.price}</div>
        </div>

        <div className={styles["cart-item--form"]}>
          <div className={styles["qty-wrap"]}>
            <div className={styles["minus"]} onClick={qtyDecreaseHandler}>
              -
            </div>
            <input
              type='text'
              value={item.quantity}
              onChange={(e) => qtyChangeHandler(e)}
            />
            <div className={styles["plus"]} onClick={qtyIncreaseHandler}>
              +
            </div>
          </div>
        </div>
        <div className={styles.remove}>
          <span onClick={removeItemHandler}>&times;</span>
        </div>
      </div>
    </ListItem>
  );
};

export default CartItem;
