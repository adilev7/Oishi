import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { List, ListItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import authContext from "../../store/auth-context";
import drawerContext from "../../store/drawer-context";
import styles from "./Nav.module.scss";

const linkClass = ({ isActive }) => (isActive ? styles.activeLink : "");

const LoggedInNav = () => {
  const authCtx = useContext(authContext);
  const { toggleDrawer } = useContext(drawerContext);
  return (
    <>
      <ListItem>
        <NavLink className={linkClass} to='/profile/123' onClick={toggleDrawer}>
          <PersonIcon />
          View Profile
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink className={linkClass} to='/settings' onClick={toggleDrawer}>
          <SettingsIcon />
          Settings
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          to='/'
          replace
          onClick={() => {
            authCtx.logout();
            toggleDrawer();
          }}>
          <LogoutIcon />
          Log Out
        </NavLink>
      </ListItem>
    </>
  );
};
const LoggedOutNav = () => {
  const { toggleDrawer } = useContext(drawerContext);
  
  return (
    <>
      <ListItem>
        <NavLink className={linkClass} to='/login' onClick={toggleDrawer}>
          <LoginIcon />
          Log In
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink className={linkClass} to='/signup' onClick={toggleDrawer}>
          <PersonAddIcon />
          Sign Up
        </NavLink>
      </ListItem>
    </>
  );
};

const UserNav = (props) => {
  const authCtx = useContext(authContext);

  const isVertical = props.layout === "vertical" || props.isMobile;
  const layoutClass = isVertical ? styles.vertical : "";
  const navContent = authCtx.isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />;
  return (
    <List className={`${styles["user-nav"]} ${layoutClass} ${props.className}`}>
      {navContent}
    </List>
  );
};

export default UserNav;
