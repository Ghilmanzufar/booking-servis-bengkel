import React from "react";

const ContactLocation = () => {
    return (
        <div className="bg-gray-50 py-12 px-4 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-black-700">Kami & Lokasi Bengkel</h2>
            <p className="text-lg mt-3 text-gray-600">
                Kami siap membantu anda. Temukan kami dengan mudah!
            </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
            {/* Peta Google Maps */}
            <div className="w-full md:w-1/2 h-80 shadow-lg rounded-lg overflow-hidden">
                <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.53238491195!2d106.6894312530837!3d-6.229728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f157d51c1c61%3A0xd9af758b214a621f!2sBengkel!5e0!3m2!1sen!2sid!4v1715334953031!5m2!1sen!2sid"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Bengkel"
                ></iframe>
            </div>

            {/* Kotak Informasi */}
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                {
                    title: "📍 Alamat Lengkap",
                    content: "Jl. Contoh Raya No. 123, Kecamatan X, Kota Y, Provinsi Z",
                },
                {
                    title: "☎️ Telepon / WhatsApp",
                    content: "0812-XXXX-XXXX",
                },
                {
                    title: "📧 Email",
                    content: "servismotor@example.com",
                },
                {
                    title: "🕐 Jam Operasional",
                    content: "Senin – Minggu: 08.00 – 17.00\nJumat: 13.00",
                },
                ].map((item, index) => (
                <div
                    key={index}
                    className="p-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{item.content}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default ContactLocation;
