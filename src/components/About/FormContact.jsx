import React, { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data dikirim:", formData);
        // Tambahkan logika submit ke backend di sini
    };

    return (
        <div className="mx-4 sm:mx-14 mt-10 mb-10 border-2 border-blue-400 rounded-lg bg-white shadow/-md">
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
                    placeholder="Nomor HP / WhatsApp *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
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
                    className="rounded-lg bg-blue-700 px-8 py-4 text-sm font-semibold text-white hover:bg-blue-800 transition duration-300"
                >
                    Kirim Pesan
                </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
