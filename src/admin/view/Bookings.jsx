import React, { useState, useEffect } from 'react';
import { Paper, Button, Snackbar, Alert } from '@mui/material';
import { TableChart } from '@mui/icons-material';
import BookingsTable from '../components/Bookings/BookingsTable';
import BookingsFilter from '../components/Bookings/BookingFilter';
import adminService from '../services/adminService';
import { useAuth } from '../context/AuthContext';
import BookingDetailModal from '../components/Bookings/BookingDetailModal';
import EditBookingModal from '../components/Bookings/EditBookingModal';
import axios from 'axios';

const BookingsManagement = () => {
        const { token } = useAuth();
        const [bookings, setBookings] = useState([]);
        const [filteredBookings, setFilteredBookings] = useState([]);
        const [detailOpen, setDetailOpen] = useState(false);
        const [editOpen, setEditOpen] = useState(false);
        const [editBooking, setEditBooking] = useState(null);
        const [loading, setLoading] = useState(true);
        const [bookingDetails, setBookingDetails] = useState(null);
        const [filters, setFilters] = useState({
            status: '',
            date: '',
            service: '',
            search: ''
        });
        const [selectedBooking, setSelectedBooking] = useState(null);
        const [snackbar, setSnackbar] = useState({
            open: false,
            message: '',
            severity: 'success'
        });

        // Fetch bookings data from API
        useEffect(() => {
            const fetchBookings = async () => {
                try {
                    setLoading(true);
                    const data = await adminService.getAdminBookings(token);
                    
                    const formattedData = data.map(booking => ({
                        id: booking.id,
                        customer: booking.customer_name,
                        phone: booking.customer_phone,
                        vehicle: `${booking.brand} ${booking.model} - ${booking.license_plate}`,
                        service: booking.service_name,
                        date: booking.booking_date, 
                        time: booking.booking_time.substring(0, 5),
                        status: booking.status,
                        notes: booking.complaint || 'Tidak ada catatan'
                    }));
                    
                    setBookings(formattedData);
                    setFilteredBookings(formattedData);
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                    showSnackbar('Gagal memuat data booking', 'error');
                } finally {
                    setLoading(false);
                }
            };

            fetchBookings();
        }, [token]);

        const showSnackbar = (message, severity = 'success') => {
            setSnackbar({ open: true, message, severity });
        };

        const handleCloseSnackbar = () => {
            setSnackbar(prev => ({ ...prev, open: false }));
        };

        const handleStatusChange = async (newStatus) => {
            try {
                await adminService.updateBookingStatus(selectedBooking.id, newStatus, token);
                
                const updatedBookings = bookings.map(b => 
                    b.id === selectedBooking.id ? { ...b, status: newStatus } : b
                );
                
                setBookings(updatedBookings);
                setFilteredBookings(updatedBookings);
                showSnackbar(`Status booking berhasil diubah menjadi ${newStatus}`);
            } catch (error) {
                console.error('Error updating booking status:', error);
                showSnackbar('Gagal mengubah status booking', 'error');
            }
        };

        const handleViewDetail = async (booking) => {
            setSelectedBooking(booking);
            try {
                const res = await axios.get(`http://localhost:5000/api/admin/bookings/${booking.id}`, {
                headers: { Authorization: `Bearer ${token}` }
                });
                setBookingDetails(res.data);
                setDetailOpen(true);
            } catch (err) {
                console.error(err);
                showSnackbar('Gagal memuat detail booking', 'error');
            }
        };

        const handleCloseDetail = () => {
            setDetailOpen(false);
            setSelectedBooking(null);
        };

        const handleCloseEdit = () => {
            setEditOpen(false);
            setEditBooking(null);
        };

        const handleEditBooking = (booking) => {
            setEditBooking(booking);
            setDetailOpen(false); // Tutup modal detail
            setEditOpen(true);
        };

        // Simpan perubahan
        const handleSaveEdit = async (updatedData) => {
            try {
                await adminService.updateBooking(updatedData.id, {
                    booking_date: updatedData.date,
                    booking_time: updatedData.time,
                    complaint: updatedData.complaint,
                    payment_method: updatedData.payment_method
                }, token);

                const updated = bookings.map(b =>
                    b.id === updatedData.id
                        ? { ...b, date: updatedData.date, time: updatedData.time }
                        : b
                );

                setBookings(updated);
                setFilteredBookings(updated);
                setEditOpen(false);
                showSnackbar('Booking berhasil diperbarui');
            } catch (err) {
                console.error(err);
                showSnackbar('Gagal menyimpan perubahan', 'error');
            }
        };
        
        // Simpan perubahan
        return (
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Manajemen Booking</h1>
                    <Button
                        variant="contained"
                        startIcon={<TableChart />}
                        onClick={() => window.location.reload()} // Refresh data
                    >
                        Refresh Data
                    </Button>
                </div>

                <BookingsFilter 
                    filters={filters} 
                    setFilters={setFilters} 
                    bookings={bookings}
                    setFilteredBookings={setFilteredBookings}
                />

                <BookingsTable
                    loading={loading}
                    filteredBookings={filteredBookings}
                    setSelectedBooking={setSelectedBooking}
                    handleStatusChange={handleStatusChange}
                    handleViewDetail={handleViewDetail}
                />

                <BookingDetailModal
                    open={detailOpen}
                    onClose={handleCloseDetail}
                    booking={selectedBooking}
                    bookingDetails={bookingDetails}
                    onEdit={handleEditBooking}
                />

                <EditBookingModal
                    open={editOpen}
                    onClose={handleCloseEdit}
                    booking={editBooking}
                    onSave={handleSaveEdit}
                />
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        );
    };

    export default BookingsManagement;