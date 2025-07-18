// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../admin/context/AuthContext';

const ProtectedRoute = () => {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;