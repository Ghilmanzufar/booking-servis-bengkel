import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UserProfileHeader from "../components/Profile/Header";
import UserInfoSection from "../components/Profile/UserInfoSection";
import DataMotorPengguna from "../components/Profile/DataMotor";
import RiwayatBookingTable from "../components/Profile/RiwayatBooking";
const ProfileUser = () =>{
    return (
        <div>
            <Navbar />
            <UserProfileHeader />
            <UserInfoSection />
            <DataMotorPengguna />
            <RiwayatBookingTable />
            <Footer />
        </div>
    );
};

export default ProfileUser;