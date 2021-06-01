import React, { createContext, useState } from "react";

export const authContenxt = createContext();

const useProviderAuth = () => {
  const [user, setUser] = useState(null);

  const signIn = (valueInput) => {
     console.log(valueInput);
    return setUser("User");
  };

  const signOut = () => {
    return setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
  };
};

export const AuthProvider = ({ children }) => {
  const user = useProviderAuth();
  return <authContenxt.Provider value={user}>{children}</authContenxt.Provider>;
};
