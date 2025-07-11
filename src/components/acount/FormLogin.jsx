import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../admin/context/AuthContext'
const LoginForm = () => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const redirectAfterLogin = (user, navigate) => {
        if (user.is_admin) return navigate('/admin');
        return navigate('/booking'); // default
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            const res = await axios.post('https://be.booking-servis-motor.biz.id/api/auth/login', formData);
            toast.success(res.data.message || 'Login berhasil!');
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            login(res.data.token, res.data.user);
            
            setTimeout(() => {
                redirectAfterLogin(res.data.user, navigate);
            }, 1000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login gagal');
        } finally {
            setIsLoading(false); // 👈 End loading
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 backdrop-blur-sm">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login Ke Akun Anda
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoFocus 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@mail.com"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                
                <div className="flex justify-end mb-1">
                    <a
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Lupa Password?
                    </a>
                </div>

                <button
                type="submit" disabled={isLoading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    {isLoading && <span className="loader-spinner"></span>}
                Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Tidak memiliki akun? Silahkan {' '}
                <a
                    href="/register"
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                    Buat Akun
                </a>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
};

export default LoginForm;
