import React from "react";
import { FaImage } from "react-icons/fa";

const ProductSelection = ({ serviceProducts, formData, handleProductSelect, formatPrice }) => {
    return (
        <div className="border-t pt-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
                <FaImage /> Pilihan Produk
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceProducts.map(product => (
                    <div 
                        key={product.id}
                        onClick={() => handleProductSelect(product.id)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            formData.product_id === product.id.toString() 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'hover:border-gray-400'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            {product.image_url && (
                                <img 
                                    src={`https://be.booking-servis-motor.biz.id/ /images/products/${product.image_url}`}
                                    alt={product.name}
                                    className="w-16 h-16 object-contain rounded"
                                />
                            )}
                            <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-gray-600">{product.brand}</p>
                                <p className="text-blue-600 font-semibold mt-1">
                                    {formatPrice(product.price)}
                                </p>
                                {product.description && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {product.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {formData.product_id && (
                <p className="text-sm text-green-600 mt-2">
                    Produk terpilih: {
                        serviceProducts.find(p => String(p.id) === String(formData.product_id))?.name || 'Tidak ditemukan'
                    }
                </p>
            )}
        </div>
    );
};

export default ProductSelection;