import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const hasToken = document.cookie.includes("token");
  if (hasToken) return <Navigate to="/dashboard" />;
  return children;
};

export default PublicRoute;
