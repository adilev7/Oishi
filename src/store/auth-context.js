import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logout: () => {},
  login: (email, password) => {}
});

export default AuthContext