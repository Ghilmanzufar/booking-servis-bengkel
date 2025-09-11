import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";

const PaymentSummary = ({ selectedService, serviceProducts, formData, totalPayment, formatPrice }) => {
    return (
        <div className="border-t pt-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
                <FaMoneyBillWave /> Total Pembayaran
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
                {selectedService && !selectedService.has_products && (
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Biaya Servis:</span>
                        <span className="font-medium">
                        Rp {formatPrice(selectedService.current_price)}
                        </span>
                    </div>
                )}
                
                {formData.product_id && (
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Produk Tambahan:</span>
                        <span className="font-medium">
                        {serviceProducts.find(p => String(p.id) === String(formData.product_id))
                            ? `Rp ${formatPrice(serviceProducts.find(p => String(p.id) === String(formData.product_id)).price)} x ${formData.product_quantity}`
                            : '-'}
                        </span>
                    </div>
                )}

                
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-bold text-blue-600">
                        Rp {formatPrice(totalPayment)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PaymentSummary;