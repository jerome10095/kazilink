import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, needsProfile, loading } = useAuth();

  if (loading) return null;
  if (needsProfile) return <Navigate to="/register" replace />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
