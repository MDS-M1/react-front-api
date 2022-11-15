import React, { createContext, useContext } from "react";
import { useLocalObservable } from "mobx-react";
import { Navigate, useLocation } from "react-router-dom";

import { createAuthStore } from "../store/Auth.store";

export const AuthContext = createContext<any>(null);

type AuthProviderProps = {
  children: JSX.Element;
};

interface IProtectedRoute extends AuthProviderProps {
  requestedRole?: string | string[];
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const authStore = useLocalObservable(createAuthStore);

  authStore.getUserData();

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthContext);

export const ProtectedRoute = ({
  requestedRole,
  children,
}: IProtectedRoute): JSX.Element => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  const hasPermission = Array.isArray(requestedRole)
    ? Object.values(requestedRole).some((v) => v === user.role)
    : user.role === requestedRole;

  if (!hasPermission) {
    return <Navigate to="/" replace />;
  }

  return children;
};
