import React from 'react';

const DataMotorPengguna = () => {
    return (
        <div className="my-8">
        <div className="flex justify-between items-center mx-8 mb-4">
            <h2 className="text-2xl sm:text-3xl pl-6 font-bold">Data Motor Pengguna</h2>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
            + Tambah Motor
            </button>
        </div>
        <div className="mx-8 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">Merk</th>
                <th scope="col" className="px-6 py-3">Tipe / Model</th>
                <th scope="col" className="px-6 py-3">Tahun</th>
                <th scope="col" className="px-6 py-3">Plat Nomor</th>
                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Honda
                </th>
                <td className="px-6 py-4">Vario 125</td>
                <td className="px-6 py-4">2020</td>
                <td className="px-6 py-4">B 1234 ABC</td>
                <td className="px-6 py-4 text-right space-x-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</a>
                </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Yamaha
                </th>
                <td className="px-6 py-4">NMax</td>
                <td className="px-6 py-4">2021</td>
                <td className="px-6 py-4">D 5678 DEF</td>
                <td className="px-6 py-4 text-right space-x-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</a>
                </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Suzuki
                </th>
                <td className="px-6 py-4">Satria F150</td>
                <td className="px-6 py-4">2019</td>
                <td className="px-6 py-4">Z 9012 GHI</td>
                <td className="px-6 py-4 text-right space-x-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</a>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default DataMotorPengguna;
