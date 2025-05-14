import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    HomeIcon,
} from '@heroicons/react/24/solid';
    
const UserInfoSection = () => {
    return (
        <section className="px-4 sm:px-10 py-8 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Info Akun / Data Diri
            </h2>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Nama Lengkap */}
            <div className="flex flex-col items-center">
                <UserIcon className="w-12 h-12 text-blue-600 mb-2" />
                <p className="text-sm text-blue-600">Nama Lengkap</p>
                <p className="font-normal text-lg">John Doe</p>
            </div>
    
            {/* Email */}
            <div className="flex flex-col items-center">
                <EnvelopeIcon className="w-12 h-12 text-blue-600 mb-2" />
                <p className="text-sm text-blue-600">Email</p>
                <p className="font-normal text-lg break-words">johndoe@example.com</p>
            </div>
    
            {/* Nomor WhatsApp */}
            <div className="flex flex-col items-center">
                <PhoneIcon className="w-12 h-12 text-blue-600 mb-2" />
                <p className="text-sm text-blue-600">Nomor WhatsApp</p>
                <p className="font-normal text-lg">+1234567890</p>
            </div>
    
            {/* Alamat */}
            <div className="flex flex-col items-center">
                <HomeIcon className="w-12 h-12 text-blue-600 mb-2" />
                <p className="text-sm text-blue-600">Alamat</p>
                <p className="font-normal text-lg">Jakarta</p>
            </div>
            </div>
        </section>
    );
};

export default UserInfoSection;
