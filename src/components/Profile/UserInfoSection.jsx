import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
} from '@heroicons/react/24/solid';

    const UserInfoSection = ({ user }) => {
    return (
        <section className="px-4 sm:px-10 py-8 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Info Akun / Data Diri
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
            <UserIcon className="w-12 h-12 text-blue-600 mb-2" />
            <p className="text-sm text-blue-600">Nama Lengkap</p>
            <p className="font-normal text-lg">{user.name}</p>
            </div>

            <div className="flex flex-col items-center">
            <EnvelopeIcon className="w-12 h-12 text-blue-600 mb-2" />
            <p className="text-sm text-blue-600">Email</p>
            <p className="font-normal text-lg break-words">{user.email}</p>
            </div>

            <div className="flex flex-col items-center">
            <PhoneIcon className="w-12 h-12 text-blue-600 mb-2" />
            <p className="text-sm text-blue-600">Nomor WhatsApp</p>
            <p className="font-normal text-lg">{user.phone || '-'}</p>
            </div>
        </div>
        </section>
    );
};

export default UserInfoSection;
