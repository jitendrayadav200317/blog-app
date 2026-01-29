import React from "react";
import { getCookies } from "../utils/utils.js";
import { Navigate, Outlet } from "react-router";

function ProesctedRoutes() {
  const isAuthenticated = getCookies("isAuthenticated");
  if (!isAuthenticated) {
    return <Navigate to="login" />;
  }
  return <Outlet />;
}
export default ProesctedRoutes;
