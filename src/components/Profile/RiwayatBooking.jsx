import React from "react";

const RiwayatBookingTable = () => {
    const dataBooking = [
        {
        tanggal: "2025-05-08",
        layanan: "Ganti Oli",
        motor: "Honda Beat 2018",
        status: "selesai",
        },
        {
        tanggal: "2025-05-12",
        layanan: "Servis Ringan",
        motor: "Yamaha Mio M3 2020",
        status: "terjadwal",
        },
    ];

    const renderStatusBadge = (status) => {
        switch (status) {
        case "selesai":
            return (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Selesai
            </span>
            );
        case "terjadwal":
            return (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                Terjadwal
            </span>
            );
        default:
            return null;
        }
    };

    const renderAksi = (status) => {
        if (status === "selesai") {
        return (
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Lihat Detail
            </a>
        );
        } else if (status === "terjadwal") {
        return (
            <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
            Batalkan
            </button>
        );
        }
    };

    return (
        <div className="p-4 mx-6">
        <h2 className="text-3xl font-bold mb-4 pl-8 text-black ">
            Riwayat Booking Servis
        </h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">Tanggal</th>
                <th scope="col" className="px-6 py-3">Layanan</th>
                <th scope="col" className="px-6 py-3">Motor</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {dataBooking.map((item, index) => (
                <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <td className="px-6 py-4">{item.tanggal}</td>
                    <td className="px-6 py-4">{item.layanan}</td>
                    <td className="px-6 py-4">{item.motor}</td>
                    <td className="px-6 py-4">{renderStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-right">{renderAksi(item.status)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default RiwayatBookingTable;
