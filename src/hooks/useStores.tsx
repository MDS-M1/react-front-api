import React from "react";
import { AuthStore } from "../store/Auth.store";

export const StoresContext = React.createContext({
  authStore: new AuthStore(),
});

export const useStores = () => React.useContext(StoresContext);
