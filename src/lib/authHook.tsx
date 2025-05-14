/** @format */

// import { useUser } from "./auth";
// import { Navigate, useLocation } from "react-router";
// import { paths } from "../config/paths";
// import React from "react";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const { data: user, isLoading } = useUser();

//   if (isLoading) {
//     return <></>;
//   }
//   if (!user) {
//     return (
//       <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
//     );
//   }

//   return children;
// };

// export default ProtectedRoute;
