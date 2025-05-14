import React from "react";
import {
    ClipboardList,
    CalendarClock,
    Bike,
    CheckCircle,
    MapPin
} from "lucide-react";

    const steps = [
    {
        icon: <ClipboardList className="h-10 w-10 text-blue-600" />,
        title: "Pilih Layanan",
        description: "Cek harga dan deskripsi layanan yang tersedia."
    },
    {
        icon: <CalendarClock className="h-10 w-10 text-blue-600" />,
        title: "Pilih Tanggal & Waktu",
        description: "Pilih tanggal dan jam sesuai keinginan Anda."
    },
    {
        icon: <Bike className="h-10 w-10 text-blue-600" />,
        title: "Isi Data Motor",
        description: "Lengkapi informasi motor untuk layanan yang tepat."
    },
    {
        icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
        title: "Konfirmasi",
        description: "Anda akan menerima notifikasi via WhatsApp/Email."
    },
    {
        icon: <MapPin className="h-10 w-10 text-blue-600" />,
        title: "Datang ke Bengkel",
        description: "Kunjungi bengkel sesuai jadwal yang telah dipilih."
    }
    ];

const BookingStepsSection = () => {
    return (
        <section className="bg-white py-20">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
            <h2 className="block w-full bg-gradient-to-b from-black to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">Cara Booking</h2>
            <p className="text-gray-600 mb-12">
                Ikuti langkah-langkah mudah berikut untuk melakukan booking servis motor di bengkel kami.
            </p>
            </div>
            <div className="flex flex-wrap -mx-4 mt-12">
            {steps.map((step, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8 h-full text-center">
                    <div className="mb-4 flex justify-center">
                    {step.icon}
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                    {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default BookingStepsSection;
