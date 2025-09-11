// components/booking/RiwayatBookingTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import BookingDetailModal from "./BookingDetailModal";

const RiwayatBookingTable = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://be.booking-servis-motor.biz.id/api/bookings", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(response.data.bookings);
                toast.success('Riwayat booking berhasil dimuat');
            } catch (error) {
                console.error("Gagal memuat riwayat:", error);
                toast.error(error.response?.data?.message || 'Gagal memuat riwayat booking');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancel = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`https://be.booking-servis-motor.biz.id/api/bookings/${bookingToCancel.id}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(bookings.map(b => 
                b.id === bookingToCancel.id ? { ...b, status: 'dibatalkan' } : b
            ));
            toast.success('Booking berhasil dibatalkan');
        } catch (error) {
            console.error("Gagal membatalkan booking:", error);
            toast.error(error.response?.data?.message || "Gagal membatalkan booking");
        } finally {
            setIsCancelModalOpen(false);
            setBookingToCancel(null);
        }
    };

    const confirmCancel = (booking) => {
        setBookingToCancel(booking);
        setIsCancelModalOpen(true);
    };

    const handleViewDetail = async (bookingId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`https://be.booking-servis-motor.biz.id/api/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedBooking(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Gagal mengambil detail:", error);
            toast.error('Gagal memuat detail booking');
        }
    };

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
            case "diproses":
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-500 dark:text-white">
                        Diproses
                    </span>
                );
            case "dibatalkan":
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        Dibatalkan
                    </span>
                );
            default:
                return null;
        }
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number' || isNaN(price)) return '0';
        const priceStr = price % 1 === 0 ? price.toString() : price.toFixed(2);
        return priceStr.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    if (loading) return <div className="text-center py-8">Memuat riwayat...</div>;

    return (
        <div className="p-4 mx-6">
            <h2 className="text-3xl font-bold mb-4 pl-8 text-black">
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
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {new Date(booking.booking_date).toLocaleDateString('id-ID')}
                                </td>
                                <td className="px-6 py-4">{booking.service_name || 'Layanan tidak ditemukan'}</td>
                                <td className="px-6 py-4">
                                    {booking.brand} {booking.model} ({booking.license_plate})
                                </td>
                                <td className="px-6 py-4">
                                    {renderStatusBadge(booking.status)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleViewDetail(booking.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                                    >
                                        Lihat Detail
                                    </button>
                                    {booking.status === 'terjadwal' && (
                                        <button
                                            onClick={() => confirmCancel(booking)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Batalkan
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal Detail Booking */}
                {isModalOpen && selectedBooking && (
                    <BookingDetailModal 
                        booking={selectedBooking}
                        onClose={() => setIsModalOpen(false)}
                        onCancel={confirmCancel}
                        formatPrice={formatPrice}
                    />
                )}

                {/* Cancel Confirmation Modal */}
                {isCancelModalOpen && bookingToCancel && (
                    <div className="fixed z-20 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 backdrop-blur-sm bg-white/40">
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <FaCalendarAlt className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Konfirmasi Pembatalan
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Apakah Anda yakin ingin membatalkan booking servis untuk motor {bookingToCancel.brand} {bookingToCancel.model} pada tanggal {new Date(bookingToCancel.booking_date).toLocaleDateString('id-ID')}?
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Jika ingin ingin membatalkan booking, duit dikembalikan H+1 pembatalan.
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Untuk info lebih lanjut, silakan hubungi admin.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                    >
                                        Ya, Batalkan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsCancelModalOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                    >
                                        Tidak
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiwayatBookingTable;