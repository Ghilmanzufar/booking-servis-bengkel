import axios from 'axios';

const getAdminStats = async (token) => {
    try {
        const response = await axios.get('http://localhost:5000/api/admin/stats', {
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
            const response = await axios.get(`http://localhost:5000/api/admin/bookings/recent`, {
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
            const response = await axios.get(`http://localhost:5000/api/admin/bookings`, {
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
                `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
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
            const response = await axios.get(`http://localhost:5000/api/admin/customers`, {
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
            const response = await axios.get(`http://localhost:5000/api/admin/customers/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // Pastikan struktur data konsisten
            return {
                ...response.data,
                vehicles: response.data.vehicles || [],
                bookings: response.data.bookings || []
            };
        } catch (error) {
            console.error('Error fetching customer detail:', error);
            throw error;
        }
    };

    const updateCustomer = async (id, customerData, token) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/customers/${id}`, customerData, {
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
            const response = await axios.delete(`http://localhost:5000/api/admin/customers/${id}`, {
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
export default {
    getAdminStats,
    getRecentBookings,
    getAdminBookings,
    updateBookingStatus,
    getAllCustomers,
    getCustomerDetail,
    updateCustomer,
    deleteCustomer
};