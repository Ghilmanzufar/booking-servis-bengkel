import React from "react";
import { FaQrcode } from "react-icons/fa";
import qr from '../../images/QR.jpg';

const QrisModal = ({ showQrisModal, setShowQrisModal, totalPayment, formatPrice }) => {
    if (!showQrisModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Pembayaran QRIS</h3>
                    <button 
                        onClick={() => setShowQrisModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="text-center">
                    <img 
                        src={qr}
                        alt="QR Code Pembayaran"
                        className="mx-auto w-64 h-64 object-contain mb-4 border border-gray-200 p-2"
                    />
                    
                    <p className="text-sm text-gray-600 mb-2">
                        Scan QR code di atas untuk melakukan pembayaran
                    </p>
                    <div className="mb-4 bg-gray-50 p-3 rounded">
                        <div className="flex justify-between">
                            <span className="font-medium">Total Pembayaran:</span>
                            <span className="font-bold">Rp {formatPrice(totalPayment)}</span>
                        </div>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Harap lakukan pembayaran saat booking
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        type="button"
                        onClick={() => setShowQrisModal(false)}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Saya Sudah Bayar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrisModal;