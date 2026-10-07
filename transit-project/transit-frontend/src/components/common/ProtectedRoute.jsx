import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Blocks a page unless logged in, and optionally restricts by role
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />; // not logged in at all
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />; // wrong role

  return children;
}
