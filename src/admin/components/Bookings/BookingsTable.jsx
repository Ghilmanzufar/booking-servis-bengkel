import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    CircularProgress,
    Menu,
    MenuItem
} from '@mui/material';
import { MoreVert, CheckCircle, Cancel, Info } from '@mui/icons-material';

const BookingsTable = ({
    loading,
    filteredBookings,
    setSelectedBooking,
    handleStatusChange,
    handleViewDetail
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedBooking, setSelectedBookingLocal] = React.useState(null);

    const handleMenuOpen = (event, booking) => {
        setAnchorEl(event.currentTarget);
        setSelectedBooking(booking); 
        setSelectedBookingLocal(booking); 
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'diproses': return 'success';
            case 'terjadwal': return 'warning';
            case 'selesai': return 'info';
            case 'dibatalkan': return 'error';
            default: return 'default';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Pelanggan</TableCell>
                            <TableCell>Kendaraan</TableCell>
                            <TableCell>Layanan</TableCell>
                            <TableCell>Tanggal/Waktu</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBookings.map((booking) => (
                            <TableRow key={booking.id} hover>
                                <TableCell>{booking.id}</TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{booking.customer}</p>
                                        <p className="text-sm text-gray-500">{booking.phone}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{booking.vehicle}</TableCell>
                                <TableCell>{booking.service}</TableCell>
                                <TableCell>
                                    {new Date(booking.date).toLocaleDateString('id-ID')} - {booking.time}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={booking.status}
                                        color={getStatusColor(booking.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={(e) => handleMenuOpen(e, booking)}
                                        size="small"
                                    >
                                        <MoreVert />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    handleViewDetail(selectedBooking); // ini akan buka modal detail
                    handleMenuClose();
                }}>
                    <Info sx={{ mr: 1 }} />
                    Lihat Detail
                </MenuItem>
                <MenuItem onClick={() => {
                    handleStatusChange('diproses');
                    handleMenuClose();
                }}>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    Konfirmasi
                </MenuItem>
                <MenuItem onClick={() => {
                    handleStatusChange('selesai');
                    handleMenuClose();
                }}>
                    <CheckCircle color="info" sx={{ mr: 1 }} />
                    Tandai Selesai
                </MenuItem>
                <MenuItem onClick={() => {
                    handleStatusChange('dibatalkan');
                    handleMenuClose();
                }}>
                    <Cancel color="error" sx={{ mr: 1 }} />
                    Batalkan
                </MenuItem>
            </Menu>
        </>
    );
};

export default BookingsTable;