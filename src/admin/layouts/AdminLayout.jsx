import React from 'react';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logout berhasil');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar onLogout={handleLogout} />
            <div className="flex-1 overflow-auto ml-64 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;