import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
