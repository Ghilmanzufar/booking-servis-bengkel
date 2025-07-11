// src/pages/VerifyOtp.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone || '';

    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post('https://be.booking-servis-motor.biz.id/api/otp/verify-otp', { phone, otp });
        toast.success(res.data.message || 'OTP terverifikasi');
        navigate('/reset-password', { state: { token: res.data.token } });
        } catch (err) {
        toast.error(err.response?.data?.message || 'OTP tidak valid');
        }
    };

    return (
        <div>
        <Navbar />
        <section
            className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center"
            style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1950&q=80')",
            }}
        >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 backdrop-blur-sm">
            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Verifikasi OTP
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Kode dikirim ke: <strong>{phone}</strong></p>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Kode OTP
                    </label>
                    <input
                        type="text"
                        name="otp"
                        id="otp"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    </div>
                    <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                    Verifikasi
                    </button>
                </form>
                </div>
            </div>
            </div>
        </section>
        <Footer />
        </div>
    );
};

export default VerifyOtp;
