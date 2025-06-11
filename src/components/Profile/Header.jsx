import userImg from './user.png';
const UserProfileHeader = ({ user }) => {
    return (
        <div className="flex items-center justify-between p-6 bg-white rounded-lg mx-10">
        <div className="flex items-center gap-4">
            <img
            src={user.avatar || userImg}
            alt="Avatar"
            className="w-20 h-20 rounded-full bg-gray-200"
            />
            <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-700 mt-1">
                Kelola data pribadi dan riwayat booking Anda.
            </p>
            </div>
        </div>

        
        </div>
    );
};

export default UserProfileHeader;
