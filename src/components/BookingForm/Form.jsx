import React from "react";

const BookingFormSection = () => {
    return (
        <section className="flex flex-col md:flex-row gap-10 justify-between px-8 py-12 bg-gray-100 rounded-xl">
        {/* Judul */}
        <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Form Booking Servis</h2>
            <p className="text-gray-600">
            Lengkapi data di bawah ini untuk melakukan booking servis motor Anda. Pastikan data kendaraan dan keluhan terisi dengan benar.
            </p>
        </div>

        {/* Form Booking */}
        <div className="md:w-2/3 bg-white p-8 rounded-lg shadow">
            <form className="space-y-6">

            {/* Pilih Layanan */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Pilih Layanan</label>
                <select
                name="layanan"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                defaultValue=""
                >
                <option value="" disabled>Pilih layanan servis</option>
                <option value="ganti_oli">Ganti Oli</option>
                <option value="servis_ringan">Servis Ringan</option>
                <option value="servis_berat">Servis Berat</option>
                <option value="ganti_ban">Ganti Ban</option>
                </select>
            </div>

            {/* Tanggal dan Waktu */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">Pilih Tanggal</label>
                <input type="date" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">Pilih Waktu</label>
                <input type="time" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
            </div>

            {/* Pilih Motor */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Pilih Kendaraan</label>
                <select
                name="motor"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                defaultValue=""
                >
                <option value="" disabled>Pilih motor Anda</option>
                <option value="motor1">Honda Beat - 2020 - B 1234 ABC</option>
                <option value="motor2">Yamaha NMAX - 2022 - D 5678 XYZ</option>
                </select>
            </div>

            {/* Detail Motor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Merek Motor</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="Contoh: Honda" />
                </div>
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tipe / Model</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="Contoh: Beat Street" />
                </div>
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tahun</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="Contoh: 2020" />
                </div>
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Plat Nomor</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="Contoh: B 1234 ABC" />
                </div>
            </div>

            {/* Keluhan */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Keluhan</label>
                <textarea
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                rows="4"
                placeholder="Jelaskan keluhan motor Anda..."
                ></textarea>
            </div>

            {/* Tombol Submit */}
            <div>
                <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition"
                >
                Konfirmasi Booking
                </button>
            </div>
            </form>
        </div>
        </section>
    );
};

export default BookingFormSection;
