import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const DateTimeSelection = ({ formData, handleChange, availableSlots, isCheckingAvailability }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt /> Pilih Tanggal
                </label>
                <input 
                    type="date" 
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-md px-4 py-2" 
                    required
                />
                {formData.tanggal && (
                    <p className={`text-sm mt-1 ${
                        availableSlots <= 0 ? 'text-red-500' : 'text-green-600'
                    }`}>
                        {isCheckingAvailability ? 'Memeriksa ketersediaan...' : 
                        availableSlots <= 0 ? 'Slot sudah penuh untuk hari ini' : 
                        `Tersisa ${availableSlots} slot`}
                    </p>
                )}
            </div>
            <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FaClock /> Pilih Waktu (08:00-16:30)
                </label>
                <input 
                    type="time" 
                    name="waktu"
                    value={formData.waktu}
                    onChange={handleChange}
                    min="08:00"
                    max="16:30"
                    step="1800"
                    className="w-full border border-gray-300 rounded-md px-4 py-2" 
                    required
                />
                <p className="text-xs text-gray-500 mt-1">Pilih waktu dalam interval 30 menit</p>
            </div>
        </div>
    );
};

export default DateTimeSelection;