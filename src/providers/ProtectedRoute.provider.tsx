import React, { createContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useStores } from "../hooks/useStores";

export const AuthContext = createContext<any>(null);

type ProtectedRouteProps = {
  children: JSX.Element;
  requestedRole?: string | string[];
};

export const ProtectedRoute = ({
  requestedRole,
  children,
}: ProtectedRouteProps): JSX.Element => {
  const { authStore } = useStores();
  const { user } = authStore;
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (requestedRole) {
    const hasPermission = Array.isArray(requestedRole)
      ? Object.values(requestedRole).some((v) => v === user.role)
      : user.role === requestedRole;

    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};
