import { Navigate, Outlet, useLocation } from "react-router";
import { getSession } from "../../auth/auth";
import { roleHasPermission } from "../../auth/hierarchyUtils";

export function RequireAdmin() {
  const location = useLocation();
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const canAccess = roleHasPermission(session.role, "dashboard_admin");
  if (!canAccess) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

