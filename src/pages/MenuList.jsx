import { List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { getMenu } from "../services/MenuService";
import { useParams } from "react-router-dom";

const MenuList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchMenu = async (category) => {
      const menuData = await getMenu(category);
      setMenu(menuData);
    };

    fetchMenu(category).catch((err) => {
      console.log(err);
    });
    
    setIsLoading(false);
  }, [category]);

  const menuContent = () => {
    if (isLoading) {
      return <ListItem>Loading...</ListItem>;
    }
    if (menu.length) {
      return menu.map((item) => (
        <MenuItem key={item.id} item={item} />
      ));
    }
    return <ListItem>Loading...</ListItem>;
  };

  return <List>{menuContent()}</List>;
};

export default MenuList;
