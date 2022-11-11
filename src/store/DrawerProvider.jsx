import { useState } from "react";
import DrawerContext from "./drawer-context";
import styles from "../components/UI/Drawer.module.scss";
const { drawer: drawerClassName } = styles;

const DrawerProvider = (props) => {
  const [drawerType, setDrawerType] = useState("menu");
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = (type) => {
    const event = type;
    if (event.currentTarget?.parentElement.classList.contains(drawerClassName)) return;
    setDrawerType((prevType) => (typeof type === "string" ? type : prevType));
    setDrawerIsOpen((drawerIsOpen) => !drawerIsOpen);
  };

  const drawerContext = {
    drawerIsOpen,
    drawerType,
    toggleDrawer,
  };
  return (
    <DrawerContext.Provider value={drawerContext}>
      {props.children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
