/** @format */

import { configureAuth } from "react-query-auth";
import { authConfig, useUser } from "./auth";
import { Navigate, useLocation } from "react-router";
import { paths } from "@/config/paths";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return <></>;
  }
  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
