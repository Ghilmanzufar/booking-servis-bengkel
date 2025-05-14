// index.jsx
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
import ForgotPasswordPage from './pages/ForgetPassword';
import ResetPasswordPage from './pages/ResetPassword';
import About from './pages/About';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/layanan" element={<DaftarLayananPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/tentang-kami" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
