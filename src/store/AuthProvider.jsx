import { useState } from "react";
import AuthContext from "./auth-context";
const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    setIsLoggedIn(false);
  }
  const loginHandler = (/* email, password */) => {
    setIsLoggedIn(true);
  }
  const authContext = {
    isLoggedIn,
    logout: logoutHandler,
    login: loginHandler
  }
  return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
