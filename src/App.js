import { Routes, Route } from "react-router-dom";
import React from "react";

import { ThemeProvider } from "@mui/material/styles";

import AuthProvider from "./store/AuthProvider";
import CartProvider from "./store/CartProvider";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import MenuList from "./pages/MenuList";
import Footer from "./components/Layout/Footer";
import DrawerProvider from "./store/DrawerProvider";
import muiTheme from "./utils/mui-theme"
import "./App.scss";



function App() {

  return (
    <AuthProvider>
      <ThemeProvider theme={muiTheme}>
        <CartProvider>
          <DrawerProvider>
            <Header dark={true} />
            <main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/menu' element={<Menu />}>
                  <Route path=':category' element={<MenuList />} />
                </Route>
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Routes>
            </main>
          </DrawerProvider>
        </CartProvider>
        <Footer dark={true} />
      </ThemeProvider>
    </AuthProvider>
  );
}
export default App;
