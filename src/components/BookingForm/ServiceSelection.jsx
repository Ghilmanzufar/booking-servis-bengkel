import React from "react";
import { FaTools } from "react-icons/fa";

const ServiceSelection = ({ services, formData, handleChange, formatPrice }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaTools /> Pilih Layanan Servis
            </label>
            <select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                required
            >
                <option value="" disabled>Pilih layanan servis</option>
                {services.map(service => (
                    <option key={service.id} value={service.id}>
                        {service.name} - Rp {formatPrice(service.current_price)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ServiceSelection;