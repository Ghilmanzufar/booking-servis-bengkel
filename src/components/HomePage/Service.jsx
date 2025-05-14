import React from "react";

const Service = () => {
    return (
        <section className="bg-white py-16">
        <div className="text-center mb-12">
            <h2 className="block w-full bg-gradient-to-b from-black to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">Jenis Layanan Kami</h2>
        </div>

        <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center w-full text-center">
            {/* Basic Plan */}
            <div className="w-full p-4 md:w-1/2 lg:w-1/3">
                <div className="flex flex-col rounded border-2 border-blue-700 bg-blue-700">
                <div className="py-5 text-blue-700 bg-white">
                    <h3 className="text-xl font-semibold">Servis CVT Matic</h3>
                    <p className="text-5xl font-bold">
                    Rp. 50.<span className="text-3xl">000</span>
                    </p>
                </div>
                <div className="py-5 bg-blue-700 text-white rounded-b">
                    <p>Cek dan perawatan CVT motor matic</p>
                    <button className="px-5 py-2 mt-5 uppercase rounded bg-white text-blue-700 font-semibold hover:bg-blue-900 hover:text-white">
                    Booking Sekarang
                    </button>
                </div>
                </div>
            </div>

            {/* Standard Plan */}
            <div className="w-full p-4 md:w-1/2 lg:w-1/3">
                <div className="flex flex-col rounded">
                <div className="py-7 bg-blue-700 text-white rounded-t">
                    <p className="uppercase text-yellow-300 font-extrabold">Terlaris</p>
                    <h3 className="text-xl font-semibold">Ganti Oli Msin</h3>
                    <p className="text-5xl font-bold">
                    Rp. 60.<span className="text-3xl">000</span>
                    </p>
                </div>
                <div>
                    <div className="pt-1 pb-7 bg-blue-700 text-white rounded-b">
                    <p>Ganti oli mesin dengan oli berkualitas</p>
                    <button className="px-5 py-2 mt-5 uppercase rounded bg-yellow-300 text-blue-700 font-semibold hover:bg-blue-900 hover:text-white">
                        Booking Sekarang
                    </button>
                    </div>
                </div>
                </div>
            </div>

            {/* Advanced Plan */}
            <div className="w-full p-4 md:w-1/2 lg:w-1/3">
                <div className="flex flex-col rounded border-2 border-blue-700 bg-blue-700">
                <div className="py-5 text-blue-700 bg-white">
                    <h3 className="text-xl font-semibold">Servis Rem</h3>
                    <p className="text-5xl font-bold">
                    Rp. 50.<span className="text-3xl">000</span>
                    </p>
                </div>
                <div className="py-5 bg-blue-700 text-white rounded-b">
                    <p>Pengecekan dan Servis pengeraman motor</p>
                    <button className="px-5 py-2 mt-5 uppercase rounded bg-white text-blue-700 font-semibold hover:bg-blue-900 hover:text-white">
                    Booking Sekarang
                    </button>
                </div>
                </div>
            </div>
            </div>

            {/* Lihat Semua Layanan Button */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href="/layanan"
            >
                LIHAT SEMUA LAYANAN
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
                </svg>
            </a>
            </div>
        </div>
        </section>
    );
};

export default Service;
