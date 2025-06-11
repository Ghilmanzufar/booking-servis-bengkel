// components/booking/BookingDetailModal.jsx
import React from "react";
import { FaCalendarAlt, FaMotorcycle, FaMoneyBillWave, FaQrcode, FaStore } from "react-icons/fa";

const BookingDetailModal = ({ 
    booking, 
    onClose, 
    onCancel,
    formatPrice 
}) => {
    const renderPaymentMethod = (method) => {
        switch(method) {
            case 'bank_transfer':
                return (
                    <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-blue-600" />
                        <span>Transfer Rekening</span>
                    </div>
                );
            case 'qris':
                return (
                    <div className="flex items-center gap-2">
                        <FaQrcode className="text-green-600" />
                        <span>QRIS</span>
                    </div>
                );
            case 'cash':
                return (
                    <div className="flex items-center gap-2">
                        <FaStore className="text-yellow-600" />
                        <span>Bayar di Tempat</span>
                    </div>
                );
            default:
                return <span>{method}</span>;
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

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 backdrop-blur-sm bg-white/40">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                            <FaCalendarAlt className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Detail Booking Servis
                            </h3>
                            
                            <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tanggal</p>
                                        <div className="mt-1 text-sm text-gray-900">
                                            {new Date(booking.booking_date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Waktu</p>
                                        <div className="mt-1 text-sm text-gray-900">
                                            {booking.booking_time.substring(0, 5)} WIB
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Motor</p>
                                    <div className="mt-1 text-sm text-gray-900">
                                        {booking.brand} {booking.model} ({booking.license_plate})
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Layanan</p>
                                    <div className="mt-1 text-sm text-gray-900">
                                        {booking.service_name} - Rp {formatPrice(
                                            booking.service_has_products === 1 &&
                                            Array.isArray(booking.products) &&
                                            booking.products.some(p => p.id && p.price)
                                                ? 0
                                                : parseFloat(booking.service_price)
                                        )}
                                    </div>
                                </div>

                                {/* Tambahan: Detail Produk */}
                                {booking.products && booking.products.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Produk Tambahan</p>
                                        <div className="mt-2 border rounded-lg divide-y">
                                            {booking.products.map((product, index) => (
                                                <div key={index} className="p-3 flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.brand}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p>Rp {formatPrice(product.price)}</p>
                                                        <p className="text-xs text-gray-500">x{product.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Total Pembayaran */}
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between font-medium">
                                        <span>Total Pembayaran:</span>
                                        <span>
                                            Rp {formatPrice(
                                                booking.service_has_products === 1 &&
                                                Array.isArray(booking.products) &&
                                                booking.products.some(p => p.id && p.price)
                                                    ? booking.products.reduce(
                                                        (total, product) => total + (parseFloat(product.price || 0) * (product.quantity || 1)),
                                                        0
                                                    )
                                                    : parseFloat(booking.service_price)
                                            )}
                                        </span>
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Metode Pembayaran</p>
                                    <div className="mt-1 text-sm text-gray-900">
                                        {renderPaymentMethod(booking.payment_method)}
                                    </div>
                                </div>

                                {/* Tambahan: Bukti Pembayaran */}
                                {booking.payment_proof && booking.payment_method !== 'cash' && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bukti Pembayaran</p>
                                        <div className="mt-2">
                                            <img 
                                                src={`http://localhost:5000/uploads/payment_proofs/${booking.payment_proof}`}
                                                alt="Bukti Pembayaran"
                                                className="max-w-full h-auto rounded border border-gray-200"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <p className="mt-1 text-sm">
                                        {renderStatusBadge(booking.status)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Keluhan</p>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {booking.complaint || 'Tidak ada keluhan'}
                                    </p>
                                </div>

                                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Tutup
                                    </button>
                                    
                                    {booking.status === 'terjadwal' && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onCancel(booking);
                                                onClose();
                                            }}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        >
                                            Batalkan Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailModal;