import React from "react";
import { FaMoneyBillWave, FaQrcode, FaStore } from "react-icons/fa";

const PaymentMethod = ({ 
    paymentMethod, 
    setPaymentMethod, 
    paymentProof, 
    paymentProofPreview, 
    handlePaymentProofChange,
    setShowQrisModal
}) => {
    return (
        <div className="border-t pt-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
                <FaMoneyBillWave /> Metode Pembayaran
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Transfer Rekening */}
                <div 
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:border-gray-400'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FaMoneyBillWave className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium">Transfer Rekening</h4>
                            <p className="text-sm text-gray-600 mb-1">
                                MANDIRI: 1560018029159 (Ghilman Zufar)
                            </p>
                        </div>
                    </div>
                </div>

                {/* QRIS */}
                <div 
                    onClick={() => setPaymentMethod('qris')}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'qris' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:border-gray-400'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                            <FaQrcode className="text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-medium">QRIS</h4>
                            <p className="text-sm text-gray-600">
                                Scan kode QR untuk pembayaran
                            </p>
                            {paymentMethod === 'qris' && (
                                <button 
                                    type="button"
                                    className="text-blue-600 text-xs mt-1 hover:underline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowQrisModal(true);
                                    }}
                                >
                                    Lihat Kode QR
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bayar di Tempat */}
                <div 
                    onClick={() => setPaymentMethod('cash')}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'cash' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:border-gray-400'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-full">
                            <FaStore className="text-yellow-600" />
                        </div>
                        <div>
                            <h4 className="font-medium">Bayar di Tempat</h4>
                            <p className="text-sm text-gray-600">
                                Bayar saat motor Anda diambil
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {paymentMethod && paymentMethod !== 'cash' && (
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Upload Bukti Pembayaran
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer">
                            <div className="border border-dashed border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50">
                                {paymentProof ? 'Ganti File' : 'Pilih File'}
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handlePaymentProofChange}
                            />
                        </label>
                        {paymentProof && (
                            <div>
                                <p className="text-sm text-gray-600">
                                    {paymentProof.name}
                                </p>
                                {paymentProofPreview && paymentProof.type.startsWith('image/') && (
                                    <img 
                                        src={paymentProofPreview} 
                                        alt="Preview Bukti Pembayaran"
                                        className="h-16 w-auto mt-2 rounded"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Format: JPG, PNG, atau PDF (maks. 2MB)
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentMethod;