import React from 'react';
import {
    TextField,
    Button,
    Paper
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';

const BookingsFilter = ({ filters, setFilters, bookings, setFilteredBookings }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({
            status: '',
            date: '',
            service: '',
            search: ''
        });
        // Reset to show all bookings when filters are cleared
        setFilteredBookings(bookings);
    };

    const applyFilters = () => {
        let result = [...bookings];
        
        if (filters.status) {
            result = result.filter(b => b.status.toLowerCase() === filters.status.toLowerCase());
        }
        
        // Filter tanggal
        if (filters.date) {
            const filterDate = new Date(filters.date).setHours(0, 0, 0, 0);
            result = result.filter(b => {
            const bookingDate = new Date(b.date).setHours(0, 0, 0, 0);
            return bookingDate === filterDate;
            });
        }
        
        if (filters.service) {
            result = result.filter(b => 
                b.service.toLowerCase().includes(filters.service.toLowerCase())
            );
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(b => 
                b.customer.toLowerCase().includes(searchTerm) ||
                b.vehicle.toLowerCase().includes(searchTerm) ||
                b.phone.includes(searchTerm)
            );
        }
        
        setFilteredBookings(result);
    };

    // Apply filters whenever filters or bookings change
    React.useEffect(() => {
        applyFilters();
    }, [filters, bookings]);

    return (
        <Paper className="p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <TextField
                    select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    SelectProps={{ native: true }}
                    variant="outlined"
                    size="small"
                    fullWidth
                >
                    <option value="">Semua Status</option>
                    <option value="terjadwal">Terjadwal</option>
                    <option value="diproses">Konfirmasi</option>
                    <option value="selesai">Selesai</option>
                    <option value="dibatalkan">Batalkan</option>
                </TextField>

                <TextField
                    label=""
                    name="date"
                    type="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    select
                    name="service"
                    value={filters.service}
                    onChange={handleFilterChange}
                    SelectProps={{ native: true }}
                    variant="outlined"
                    size="small"
                    fullWidth
                >
                    <option value="">Semua Layanan</option>
                    <option value="Ganti Oli">Ganti Oli</option>
                    <option value="Servis Rem">Servis Rem</option>
                    <option value="Tune Up Lengkap">Tune Up Lengkap</option>
                    <option value="Ganti Ban">Ganti Ban D/B</option>
                    <option value="Servis Karburator">Servis Karbu</option>
                    <option value="Ganti Aki">Ganti Aki</option>
                    <option value="Servis Rantai">Servis Rantai</option>
                    <option value="Servis Injeksi">Servis Injeksi</option>
                    <option value="Ganti Busi">Ganti busi</option>
                    <option value="Ganti Kampas Kopling">Ganti kampas kompling</option>
                </TextField>

                <div className="flex space-x-2">
                    <TextField
                        label="Cari"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: <Search fontSize="small" />
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={resetFilters}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </Paper>
    );
};

export default BookingsFilter;