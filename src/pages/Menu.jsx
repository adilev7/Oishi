import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { AppBar, Card, Tab, Tabs } from "@mui/material";
import Banner from "../components/UI/Banner";
import styles from "./Menu.module.scss";

const Menu = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const menuCategories = useMemo(() => ["sushi", "wok", "ramen"], []);

  useEffect(() => {
    if (!category) {
      navigate(menuCategories[0]);
      return;
    }
    if (!menuCategories.includes(category)) {
      navigate("/" /* 404 */);
    }
  }, [category, navigate, menuCategories]);

  return (
    <>
      <Banner
        image='https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg'
        title='Menu'
      />
      <Card
        className={styles.menu}
        sx={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}>
        <AppBar position='static' color='transparent' className={styles.tabs}>
          <Tabs value={category || menuCategories[0]}>
            {menuCategories.map((item) => (
              <Tab
                key={item}
                value={item}
                label={item}
                component={Link}
                to={item}
              />
            ))}
          </Tabs>
        </AppBar>
        <Outlet />
      </Card>
    </>
  );
};

export default Menu;
