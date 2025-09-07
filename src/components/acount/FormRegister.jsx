import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Tambahkan validasi dulu sebelum request dikirim
        if (formData.password !== formData.confirmPassword) {
            toast.error("Password dan konfirmasi password tidak cocok");
            return;
        }
        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Format email tidak valid");
            return;
        }

        //Validasi panjang password
        if (formData.password.length < 6) {
            toast.error("Password minimal 6 karakter");
            return;
        }
        // Validasi panjang nama 
        if (formData.name.trim().length < 3) {
        toast.error("Nama minimal 3 huruf");
        return;
        }
        // Validasi no HP
        if (!/^08\d{8,11}$/.test(formData.phone)) {
        toast.error("Nomor telepon tidak valid");
        return;
        }
        setIsLoading(true); // 👈 Start loading

        const { name, phone, email, password } = formData;
        try {
            const res = await axios.post('https://be.booking-servis-motor.biz.id/api/users/register', {
                name, phone, email, password
            });
            toast.success(res.data.message || "Register berhasil!");
            navigate("/login");
        } catch (err) {
            const errorMsg = err.response?.data?.message;
            if (errorMsg === "Email sudah terdaftar") {
                toast.error("Email ini sudah digunakan. Silakan gunakan email lain.");
            } else {
                toast.error(errorMsg || "Terjadi kesalahan saat registrasi.");
            }
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="flex flex-col items-center justify-center lg:py-0 backdrop-blur-sm">
        <div className="w-full my-10 rounded-lg shadow sm:max-w-md xl:p-0 bg-gray-800 border border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register akun
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Full Nama
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    autoFocus 
                    placeholder="Ghilman zufar"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                </div>

                <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nomer telepon *whatsapp
                </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                </div>

                <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@mail.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                </div>

                <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                </div>

                <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Konfirmasi password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                </div>

                <button
                type="submit" disabled={isLoading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
                >
                {isLoading && <span className="loader-spinner"></span>}
                Register Akun
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sudah memiliki akun? Silahkan{" "}
                <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                    Login Disini
                </a>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
};



export default RegisterForm;