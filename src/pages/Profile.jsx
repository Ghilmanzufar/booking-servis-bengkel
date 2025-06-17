import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UserProfileHeader from "../components/Profile/UserProfileHeader";
import UserInfoSection from "../components/Profile/UserInfoSection";
import DataMotorPengguna from "../components/Profile/DataMotor";
import RiwayatBookingTable from "../components/Profile/RiwayatBooking";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Silakan login terlebih dahulu");
                setLoading(false);
                return;
            }

            const response = await axios.get("http://localhost:5000/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUser(response.data.user);
        } catch (err) {
            setError(err.response?.data?.message || "Gagal memuat profil");
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [navigate]);

    if (loading) return <div>Memuat data profil...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Data pengguna tidak tersedia</div>;

    return (
        <div>
            <Navbar />
            <UserProfileHeader user={user} onUpdated={fetchUserProfile} />
            <UserInfoSection user={user} />
            <DataMotorPengguna />
            <RiwayatBookingTable />
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default ProfilePage;
