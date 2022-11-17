import { useState } from "react";
import AuthContext from "./auth-context";
import { login, logout } from '../services/UsersService'
const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('logged_in'));
  const logoutHandler = () => {
    logout();
    setIsLoggedIn(false);
  }
  const loginHandler = (email, password) => {
    const loginResponse = login(email, password);
    setIsLoggedIn(loginResponse.isApproved);
    return loginResponse;
  }
  const authContext = {
    isLoggedIn,
    logout: logoutHandler,
    login: loginHandler
  }
  return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
