import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Settings, Users, LogOut } from 'lucide-react';

const AdminSidebar = ({ onLogout }) => {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
            isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
        }`;

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r flex flex-col justify-between">
            <div>
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
                </div>
                <nav className="mt-6 space-y-1">
                    <NavLink to="/admin" className={linkClasses}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/bookings" className={linkClasses}>
                        <CalendarCheck size={20} />
                        Bookings
                    </NavLink>
                    <NavLink to="/admin/customers" className={linkClasses}>
                        <Users size={20} />
                        Customers
                    </NavLink>
                </nav>
            </div>
            <div className="p-6 border-t border-gray-200">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-all w-full"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;