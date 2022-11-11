import { ListItem } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import styles from "./Menu.module.scss";
import cartContext from '../store/cart-context';
import drawerContext from "../store/drawer-context";

const MenuItem = ({item}) => {
  const [quantity, setQuantity] = useState(0);
  const cartCtx = useContext(cartContext);
  const drawerCtx = useContext(drawerContext);

  const qtyDecreaseHandler = () => {
    if(quantity === 0) return;
    setQuantity((qty) => qty - 1);
  };
  const qtyIncreaseHandler = () => {
    setQuantity((qty) => qty + 1);
  };
  const qtyChangeHandler = (e) => {
    const newVal = Number(e.currentTarget.value);
    if(isNaN(newVal) || newVal < 0) return;
    setQuantity(newVal);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if(quantity <= 0) return;
    cartCtx.increment({...item, quantity});
    drawerCtx.toggleDrawer('cart');
  }
  return (
    <ListItem className={styles["menu-item"]}>
      <div className={styles["menu-item--details"]}>
        <img
          src={
            item.image ||
            "https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg"
          }
          alt={item.title}
        />
        <div className={styles["menu-item--info"]}>
          <h3>
            {item.title}{" "}
            <div className={styles.price}>
              <div>₪{item.price}</div>
            </div>
          </h3>

          <p>{item.description}</p>
        </div>
      </div>
      <form className={styles["menu-item--form"]} noValidate onSubmit={submitHandler}>
        <div className={styles["qty-wrap"]}>
          <div className={styles["minus"]} onClick={qtyDecreaseHandler}>-</div>
          <input type='text' value={quantity} onChange={qtyChangeHandler} />
          <div className={styles["plus"]} onClick={qtyIncreaseHandler}>+</div>
        </div>
        <button type='submit'>Add</button>
      </form>
    </ListItem>
  );
};

export default MenuItem;
