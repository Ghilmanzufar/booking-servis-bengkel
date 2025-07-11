import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Harap isi semua field yang wajib diisi');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Format email tidak valid');
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post('https://be.booking-servis-motor.biz.id/api/contacts', formData);
            
            if (response.data.success) {
                toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat mengirim pesan';
            
            if (err.response?.status === 400) {
                // Handle validation errors from server
                toast.error(errorMessage);
            } else if (err.response?.status === 500) {
                toast.error('Server error. Silakan coba lagi nanti.');
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-4 sm:mx-14 mt-10 mb-10 border-2 border-blue-400 rounded-lg bg-white shadow-md">
            <div className="mt-3 text-center text-4xl font-bold text-gray-800">Form Kontak Langsung</div>

            <form onSubmit={handleSubmit} className="p-8">
                {/* Nama dan Email */}
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full md:w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full md:w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                </div>

                {/* Nomor HP */}
                <div className="my-6">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Nomor HP / WhatsApp"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                </div>

                {/* Pesan */}
                <div className="mb-6">
                    <textarea
                        name="message"
                        rows="6"
                        placeholder="Pesan *"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-700 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    ></textarea>
                </div>

                {/* Tombol Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`rounded-lg bg-blue-700 px-8 py-4 text-sm font-semibold text-white hover:bg-blue-800 transition duration-300 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;