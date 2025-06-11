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
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3966.0998941540847!2d107.09869262362304!3d-6.2505665937378625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgreen%20emerald%20residence%20jalan%20green%20emerald%20residence%20jalan%20selang%20jati%20wanajaya%20kabupaten%20bekasi%20jawa%20barat!5e0!3m2!1sen!2sid!4v1747757908720!5m2!1sen!2sid"
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
                    content: "Green Emerald Residen Blok B17, Cibitung, Kab.Bekasi",
                },
                {
                    title: "☎️ Telepon / WhatsApp",
                    content: "0888-0123-8937",
                },
                {
                    title: "📧 Email",
                    content: "ghilmanzufar2004@gmail",
                },
                {
                    title: "🕐 Jam Operasional",
                    content: "Senin – Sabtu: 08.00 – 17.00\nJumat: 13.00",
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
