import React from "react";

const ComplaintSection = ({ formData, handleChange }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Keluhan (Opsional)
            </label>
            <textarea
                name="keluhan"
                value={formData.keluhan}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                rows="4"
                placeholder="Jelaskan keluhan motor Anda..."
            ></textarea>
        </div>
    );
};

export default ComplaintSection;