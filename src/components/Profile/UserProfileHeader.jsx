import userImg from './user.png';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';

const UserProfileHeader = ({ user, onUpdated }) => {
    const [editOpen, setEditOpen] = useState(false);
    return (
        <div className="flex items-center justify-between p-6 bg-white rounded-lg mx-10">
        <div className="flex items-center gap-4">
            <img
                src={user.avatar ? `https://be.booking-servis-motor.biz.id${user.avatar}` : userImg}
                alt="Avatar"
                className="w-20 h-20 rounded-full bg-gray-200"
            />
            <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            </div>
        </div>

        <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
            <FaEdit /> Edit Profil
        </button>

        <EditProfileModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            user={user}
            onUpdated={onUpdated}
        />
        </div>
    );
};

export default UserProfileHeader;