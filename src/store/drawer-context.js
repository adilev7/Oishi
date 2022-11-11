import React from "react";

const DrawerContext = React.createContext({
  drawerIsOpen: false,
  drawerType: "",
  toggleDrawer: (drawerType) => {},
});

export default DrawerContext;
