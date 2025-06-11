import React, { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import RecentBookings from '../components/RecentBooking';
import adminService from '../services/adminService';
import { useAuth } from '../context/AuthContext';
import { CircularProgress } from '@mui/material';

const DashboardHome = () => {
    const [stats, setStats] = useState([]); // Ganti null dengan array kosong
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user } = useAuth();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, bookingsData] = await Promise.all([
                    adminService.getAdminStats(token).catch(err => {
                        console.error('Error fetching stats:', err);
                        return null;
                    }),
                    adminService.getRecentBookings(token).catch(err => {
                        console.error('Error fetching bookings:', err);
                        return [];
                    })
                ]);
                setStats([
                    { 
                        title: 'Booking Hari Ini', 
                        value: statsData?.todayBookings || 0, 
                        change: statsData?.todayChange || '+0%', 
                        icon: '📅',
                        description: 'Jumlah booking hari ini' 
                    },
                    { 
                        title: 'Booking Minggu Ini', 
                        value: statsData?.weekBookings || 0, 
                        change: statsData?.weekChange || '+0%', 
                        icon: '📆',
                        description: 'Total booking 7 hari terakhir' 
                    },
                    { 
                        title: 'Booking Bulan Ini', 
                        value: statsData?.monthBookings || 0, 
                        change: statsData?.monthChange || '+0%', 
                        icon: '🗓️',
                        description: 'Total booking bulan ini' 
                    },
                    { 
                        title: 'Pelanggan Terdaftar', 
                        value: statsData?.totalUsers || 0, 
                        change: statsData?.usersChange || '+0%', 
                        icon: '👥',
                        description: 'Total pelanggan terdaftar' 
                    },
                    { 
                        title: 'Motor Terdaftar', 
                        value: statsData?.totalMotorcycles || 0, 
                        change: statsData?.motorcyclesChange || '+0%', 
                        icon: '🏍️',
                        description: 'Total kendaraan terdaftar' 
                    }
                ]);
                setRecentBookings(bookingsData || []); // Berikan array kosong jika null
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
                setStats(getDefaultStats());
                setRecentBookings([]);
            } finally {
                setLoading(false);
            }
        };

        if (token && user) { 
            fetchData();
        }
    }, [token, user]);

        // Fungsi untuk default stats
    const getDefaultStats = () => [
        { 
            title: 'Booking Hari Ini', 
            value: 0, 
            change: '+0%', 
            icon: '📅',
            description: 'Data tidak tersedia' 
        },
        { 
            title: 'Booking Minggu Ini', 
            value: 0, 
            change: '+0%', 
            icon: '📆',
            description: 'Total booking 7 hari terakhir' 
        },
        { 
            title: 'Booking Bulan Ini', 
            value: 0, 
            change: '+0%', 
            icon: '🗓️',
            description: 'Total booking bulan ini' 
        },
        { 
            title: 'Pelanggan Terdaftar', 
            value: 0, 
            change: '+0%', 
            icon: '👥',
            description: 'Total pelanggan terdaftar' 
        },
        { 
            title: 'Motor Terdaftar', 
            value: 0, 
            change: '+0%', 
            icon: '🏍️',
            description: 'Total kendaraan terdaftar' 
        }
    ];
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    // Tambahkan pengecekan jika tidak ada token/user
    if (!token || !user) {
        return (
        <div className="flex justify-center items-center h-64">
            <p>Anda harus login untuk mengakses halaman ini</p>
        </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Ringkasan</h1>
                <div className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => (
                    <StatsCard 
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        description={stat.description}
                    />
                ))}
            </div>
            {/* Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <RecentBookings bookings={recentBookings} />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;