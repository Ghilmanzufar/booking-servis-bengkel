import React from "react";
import { FaMotorcycle } from "react-icons/fa";

const MotorcycleSelection = ({ motorcycles, formData, handleChange, selectedMotor }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaMotorcycle /> Pilih Kendaraan
            </label>
            {motorcycles.length > 0 ? (
                <>
                    <select
                        name="motorId"
                        value={formData.motorId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                        required
                    >
                        <option value="" disabled>Pilih motor Anda</option>
                        {motorcycles.map(motor => (
                            <option key={motor.id} value={motor.id}>
                                {motor.brand} {motor.model} - {motor.license_plate}
                            </option>
                        ))}
                    </select>
                    
                    {selectedMotor && (
                        <div className="bg-gray-50 p-4 rounded-md mt-2">
                            <h4 className="font-medium text-gray-700">Detail Motor Dipilih:</h4>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <span className="text-sm text-gray-500">Merek:</span>
                                    <p className="font-medium">{selectedMotor.brand}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Model:</span>
                                    <p className="font-medium">{selectedMotor.model}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Tahun:</span>
                                    <p className="font-medium">{selectedMotor.year}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Plat:</span>
                                    <p className="font-medium">{selectedMotor.license_plate}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-red-500">
                    Tidak ada motor terdaftar. Silakan tambahkan motor di halaman profile terlebih dahulu.
                </div>
            )}
        </div>
    );
};

export default MotorcycleSelection;