import React, { createContext, useContext } from "react";
import { useLocalObservable } from "mobx-react";

import { createAuthStore } from "../store/Auth.store";

export const AuthContext = createContext<any>(null);

type AuthProviderProps = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const authStore = useLocalObservable(createAuthStore);

  authStore.getUserData();

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};
export const useAuthStore = () => useContext(AuthContext);
