import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import cartContext from "../../store/cart-context";
import drawerContext from "../../store/drawer-context";
import MainNav from "./MainNav";
import UserNav from "./UserNav";
import Drawer from "../UI/Drawer";
import Cart from "../Cart";
import styles from "./Header.module.scss";

const Header = (props) => {
  const cartCtx = useContext(cartContext);
  const drawerCtx = useContext(drawerContext);
  const isMobile = useMediaQuery("(max-width: 628px)");
  const darkStyle = props.dark ? styles.dark : "";

  const toggleDrawer = (e) => {
    const contentType = e.currentTarget.dataset.type;
    drawerCtx.toggleDrawer(contentType);
  };

  const drawerContentHandler = (contentType) => {
    if (contentType === "menu") {
      return (
        <>
          {isMobile && <MainNav className={styles["main-nav"]} />}
          <UserNav className={styles["user-nav"]} />
        </>
      );
    } else if (contentType === "cart") {
      return <Cart />;
    }
  };

  const drawerContent = drawerContentHandler(drawerCtx.drawerType);

  const cartItemsQuantity = cartCtx.items.reduce((total, item, index) => {
    return total + item.quantity;
  }, 0);

  return (
    <AppBar position='sticky' className={`${styles.header} ${darkStyle}`}>
      <Toolbar variant='regular' sx={{ justifyContent: "space-between" }}>
        <NavLink to='/' className={styles.logo}>
          <LocalDiningIcon fontSize='large' />
        </NavLink>
        <div className={styles["header-nav"]}>
          {!isMobile && <MainNav className={styles["main-nav"]} />}
          <div className={styles["drawer-triggers"]}>
            <IconButton
              className={styles["drawer-trigger"]}
              data-type='menu'
              onClick={(e) => toggleDrawer(e)}>
              <MenuIcon />
            </IconButton>
            <IconButton
              className={styles["drawer-trigger"]}
              data-type='cart'
              onClick={(e) => toggleDrawer(e)}>
              <ShoppingBasketIcon />
              <div
                className={styles["cart-bubble"]}>
                <span>{cartItemsQuantity}</span>
              </div>
            </IconButton>
          </div>
          <Drawer>{drawerContent}</Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
