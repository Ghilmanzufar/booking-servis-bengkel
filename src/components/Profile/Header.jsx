import React from "react";

const UserProfileHeader = () => {
    return (
        <div className="flex items-center justify-between p-6 bg-white rounded-lg mx-10">
            {/* Kiri: Avatar dan Info */}
            <div className="flex items-center gap-4">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-gray-200" />

                {/* Info User */}
                <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-sm text-gray-700 mt-1">
                    Kelola data pribadi dan riwayat booking Anda.
                </p>
                </div>
            </div>

            {/* Kanan: Tombol */}
            <div className="flex flex-col gap-2">
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition">
                Ganti Password
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
                Edit Profil
                </button>
            </div>
        </div>
    );
};

export default UserProfileHeader;
