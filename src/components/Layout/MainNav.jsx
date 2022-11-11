import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { List, ListItem, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";

import drawerContext from "../../store/drawer-context";
import styles from "./Nav.module.scss";

const MainNav = (props) => {
  const isMobile = useMediaQuery("(max-width: 628px)");
  const { toggleDrawer } = useContext(drawerContext);
  const linkClickHandler = () => isMobile ? toggleDrawer() : null;

  const linkClass = ({ isActive }) => (isActive ? styles.activeLink : "");
  return (
    <List className={`${styles["main-nav"]} ${props.className}`}>
      <ListItem>
        <NavLink className={linkClass} to='/' onClick={linkClickHandler}>
          <HomeIcon />
          Home
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink className={linkClass} to='menu' onClick={linkClickHandler}>
          <MenuBookIcon />
          Menu
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink className={linkClass} to='/about' onClick={linkClickHandler}>
          <GroupsIcon />
          About us
        </NavLink>
      </ListItem>
    </List>
  );
};

export default MainNav;
