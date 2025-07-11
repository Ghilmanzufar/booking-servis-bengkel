import React, { useState, useEffect } from 'react';
import { FaPlus, FaMotorcycle, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DataMotorPengguna = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [motorcycles, setMotorcycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        merk: '',
        model: '',
        tahun: '',
        platNomor: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [motorToDelete, setMotorToDelete] = useState(null);
    
    useEffect(() => {
        const fetchMotorcycles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://be.booking-servis-motor.biz.id/api/motorcycles', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMotorcycles(response.data.motorcycles);
                toast.success('Data motor berhasil dimuat');
            } catch (err) {
                const errorMsg = err.response?.data?.message || 'Gagal memuat data motor';
                setError(errorMsg);
                toast.error(errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchMotorcycles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const data = {
                brand: formData.merk,
                model: formData.model,
                year: formData.tahun,
                license_plate: formData.platNomor
            };

            if (editingId) {
                await axios.put(`https://be.booking-servis-motor.biz.id/api/motorcycles/${editingId}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success('Data motor berhasil diperbarui');
            } else {
                await axios.post('https://be.booking-servis-motor.biz.id/api/motorcycles', data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success('Data motor berhasil ditambahkan');
            }

            // Refresh data
            const response = await axios.get('https://be.booking-servis-motor.biz.id/api/motorcycles', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMotorcycles(response.data.motorcycles);
            
            setIsModalOpen(false);
            setFormData({
                merk: '',
                model: '',
                tahun: '',
                platNomor: '',
            });
            setEditingId(null);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal menyimpan data motor';
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    const handleEdit = (motor) => {
        setFormData({
            merk: motor.brand,
            model: motor.model,
            tahun: motor.year,
            platNomor: motor.license_plate
        });
        setEditingId(motor.id);
        setIsModalOpen(true);
    };

    const confirmDelete = (motor) => {
        setMotorToDelete(motor);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://be.booking-servis-motor.biz.id/api/motorcycles/${motorToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Refresh data
            const response = await axios.get('https://be.booking-servis-motor.biz.id/api/motorcycles', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMotorcycles(response.data.motorcycles);
            toast.success('Data motor berhasil dihapus');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal menghapus data motor';
            if (err.response?.data?.message?.includes('riwayat booking')) {
                toast.error('Motor tidak dapat dihapus karena memiliki riwayat booking');
            } else {
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } finally {
            setIsDeleteModalOpen(false);
            setMotorToDelete(null);
        }
    };

    if (loading) return <div className="text-center py-8">Memuat data motor...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="my-8">
            <div className="flex justify-between items-center mx-8 mb-4">
                <h2 className="text-2xl sm:text-3xl pl-6 font-bold">Data Motor Pengguna</h2>
                <button 
                    onClick={() => {
                        setEditingId(null);
                        setFormData({
                            merk: '',
                            model: '',
                            tahun: '',
                            platNomor: ''
                        });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    <FaPlus /> Tambah Motor
                </button>
            </div>

            <div className="mx-8 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Merk</th>
                            <th scope="col" className="px-6 py-3">Tipe / Model</th>
                            <th scope="col" className="px-6 py-3">Tahun</th>
                            <th scope="col" className="px-6 py-3">Plat Nomor</th>
                            <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {motorcycles.length > 0 ? (
                            motorcycles.map((motor) => (
                                <tr key={motor.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {motor.brand}
                                    </th>
                                    <td className="px-6 py-4">{motor.model}</td>
                                    <td className="px-6 py-4">{motor.year}</td>
                                    <td className="px-6 py-4">{motor.license_plate}</td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <button 
                                            onClick={() => handleEdit(motor)}
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            <FaEdit className="inline mr-1" /> Edit
                                        </button>
                                        <button 
                                            onClick={() => confirmDelete(motor)}
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            <FaTrash className="inline mr-1" /> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center">
                                    Tidak ada data motor
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Tambah/Edit Motor */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 backdrop-blur-sm bg-white/40">                        
                        {/* Modal Container */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            {/* Modal Header */}
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FaMotorcycle className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {editingId ? 'Edit Data Motor' : 'Tambah Data Motor'}
                                    </h3>
                                    
                                    <div className="mt-2">
                                        {/* Form Input */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Merk Motor</label>
                                                <input
                                                    type="text"
                                                    name="merk"
                                                    value={formData.merk}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Model/Tipe</label>
                                                <input
                                                    type="text"
                                                    name="model"
                                                    value={formData.model}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Tahun Motor</label>
                                                <input
                                                    type="number"
                                                    name="tahun"
                                                    value={formData.tahun}
                                                    onChange={handleChange}
                                                    min="1980"
                                                    max={new Date().getFullYear()}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Plat Nomor</label>
                                                <input
                                                    type="text"
                                                    name="platNomor"
                                                    value={formData.platNomor}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border uppercase"
                                                    required
                                                />
                                            </div>

                                            {/* Modal Footer */}
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                                    >
                                                        Simpan
                                                    </button>
                                                </span>
                                                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsModalOpen(false)}
                                                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                                    >
                                                        Batal
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed z-20 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 backdrop-blur-sm bg-white/40">
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <FaTrash className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Konfirmasi Hapus Motor
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Apakah Anda yakin ingin menghapus motor {motorToDelete?.brand} {motorToDelete?.model} dengan plat nomor {motorToDelete?.license_plate}?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                >
                                    Hapus
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataMotorPengguna;