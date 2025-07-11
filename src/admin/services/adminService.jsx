import axios from 'axios';

const getAdminStats = async (token) => {
    try {
        const response = await axios.get('https://be.booking-servis-motor.biz.id/api/admin/stats', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        throw error;
    }
};

    const getRecentBookings = async (token) => {
        try {
            const response = await axios.get(`https://be.booking-servis-motor.biz.id/api/admin/bookings/recent`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching recent bookings:', error);
            throw error;
        }
    };
    
    // Pastikan format data dari API konsisten
    const getAdminBookings = async (token) => {
        try {
            const response = await axios.get(`https://be.booking-servis-motor.biz.id/api/admin/bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }); 
            // Format data untuk konsistensi
            return response.data.map(booking => ({
                id: booking.id,
                customer_name: booking.customer_name || booking.user_name,
                customer_phone: booking.customer_phone || booking.user_phone,
                brand: booking.brand,
                model: booking.model,
                license_plate: booking.license_plate,
                service_name: booking.service_name,
                booking_date: booking.booking_date,
                booking_time: booking.booking_time,
                status: booking.status.toLowerCase(), 
                complaint: booking.complaint
            }));
        } catch (error) {
            console.error('Error fetching admin bookings:', error);
            throw error;
        }
    };

    const updateBookingStatus = async (bookingId, status, token) => {
        try {
            const response = await axios.put(
                `https://be.booking-servis-motor.biz.id/api/admin/bookings/${bookingId}/status`,
                { status },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating booking status:', error);
            throw error;
        }
    };

    
    const getAllCustomers = async (token) => {
        try {
            const response = await axios.get(`https://be.booking-servis-motor.biz.id/api/admin/customers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    };

    // services/adminService.js
    const getCustomerDetail = async (id, token) => {
        try {
            const response = await axios.get(`https://be.booking-servis-motor.biz.id/api/admin/customers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // ✅ Tambahkan log untuk pastikan respons
            console.log('📦 RAW response from backend:', response.data);

            // ✅ Jangan overwrite vehicles/bookings di sini
            return response.data; // Langsung kembalikan tanpa overwrite
        } catch (error) {
            console.error('❌ Error fetching customer detail:', error);
            throw error;
        }
    };


    const updateCustomer = async (id, customerData, token) => {
        try {
            const response = await axios.put(`https://be.booking-servis-motor.biz.id/api/admin/customers/${id}`, customerData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating customer:', error);
            throw error;
        }
    };

    const deleteCustomer = async (id, token) => {
        try {
            const response = await axios.delete(`https://be.booking-servis-motor.biz.id/api/admin/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    };

    const updateBooking = async (id, data, token) => {
        const res = await axios.put(`https://be.booking-servis-motor.biz.id/api/admin/bookings/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    };

    const addMotorcycle = async (data, token) => {
        const res = await axios.post('https://be.booking-servis-motor.biz.id/api/admin/motorcycles', data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    }

    const updateMotorcycle = async (id, data, token) => {
        const res = await fetch(`https://be.booking-servis-motor.biz.id/api/admin/motorcycles/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Gagal update kendaraan');
        return result;
    };

    const deleteMotorcycle = async (id, token) => {
        const res = await fetch(`https://be.booking-servis-motor.biz.id/api/admin/motorcycles/${id}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Gagal menghapus motor');
        return result;
    };

    const getAllContacts = async (token) => {
        const res = await axios.get('https://be.booking-servis-motor.biz.id/api/contacts', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data;
    };

    const deleteContact = async (id, token) => {
        const res = await axios.delete(`https://be.booking-servis-motor.biz.id/api/contacts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    };

export default {
    getAdminStats,
    getRecentBookings,
    getAdminBookings,
    updateBookingStatus,
    getAllCustomers,
    getCustomerDetail,
    updateCustomer,
    deleteCustomer,
    updateBooking,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    getAllContacts,
    deleteContact
};