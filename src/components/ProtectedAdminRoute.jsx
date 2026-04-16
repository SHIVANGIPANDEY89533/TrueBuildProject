import { useAuth } from '.';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useAuth();

  if (!admin) {
    return <Navigate to="/" />;   // login page ya home redirect
  }

  return children;
};

export default ProtectedAdminRoute;