import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Homepage from './pages/Home';
import DaftarLayananPage from './pages/DaftarLayanan';
import ProfilePage from './pages/Profile';
import BookingForm from './pages/BookingForm';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';
import DashboardHome from './admin/view/DasboardHome';
import BookingsManagement from './admin/view/Bookings';
import ServicesManagement from './admin/view/ServicesPage';
import CustomersManagement from './admin/view/Customers';
import ContactsManagement from './admin/view/ContactsManagement';
import AdminRoute from './admin/components/adminRoute';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import {AuthProvider}  from './admin/context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/layanan" element={<DaftarLayananPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="/admin/bookings" element={<BookingsManagement />} />
                <Route path="/admin/services" element={<ServicesManagement />} />
                <Route path="/admin/customers" element={<CustomersManagement />} />
                <Route path="/admin/contacts" element={<ContactsManagement />} />
            </Route>
        </Route>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/booking" element={<BookingForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);