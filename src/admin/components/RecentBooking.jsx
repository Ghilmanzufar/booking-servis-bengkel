import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar,
    IconButton,
    Modal,
    Box,
    Typography
} from '@mui/material';
import { ChevronRight, TwoWheeler, Close } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const RecentBookings = ({ bookings = [] }) => {
    const [open, setOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleRowClick = (booking) => {
        setSelectedBooking(booking);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBooking(null);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'selesai':
                return 'success';
            case 'terjadwal':
                return 'primary';
            case 'diproses':
                return 'warning';
            case 'dibatalkan':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <>
            <Paper className="p-4 h-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Booking Terbaru</h2>
                </div>
                
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Pelanggan</TableCell>
                                <TableCell>Layanan</TableCell>
                                <TableCell>Tanggal</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow 
                                    key={booking.id} 
                                    hover
                                    onClick={() => handleRowClick(booking)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar sx={{ width: 32, height: 32, fontSize: 14 }} className="mr-2">
                                                {booking.user_name?.charAt(0) || '?'}
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">
                                                    {booking.user_name || 'Pelanggan Tidak Diketahui'}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <TwoWheeler fontSize="inherit" className="mr-1" />
                                                    {booking.brand} {booking.model} - {booking.license_plate}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {booking.service_name || 'Layanan Tidak Diketahui'}
                                    </TableCell>
                                    <TableCell>
                                        {booking.booking_date ? 
                                            new Date(booking.booking_date).toLocaleDateString('id-ID') 
                                            : '-'} - {booking.booking_time?.substring(0, 5) || ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip 
                                            label={booking.status || 'unknown'} 
                                            size="small" 
                                            color={getStatusColor(booking.status)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Modal untuk Detail Booking */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex justify-between items-start mb-4">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Detail Booking
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </div>
                    
                    {selectedBooking && (
                        <div className="space-y-4">
                            <div>
                                <Typography variant="subtitle2">Pelanggan</Typography>
                                <Typography>
                                    {selectedBooking.user_name}
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="subtitle2">Motor</Typography>
                                <Typography>
                                    {selectedBooking.brand} {selectedBooking.model} - {selectedBooking.license_plate}
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="subtitle2">Layanan</Typography>
                                <Typography>
                                    {selectedBooking.service_name}
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="subtitle2">Waktu Booking</Typography>
                                <Typography>
                                    {new Date(selectedBooking.booking_date).toLocaleDateString('id-ID')} - {selectedBooking.booking_time}
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="subtitle2">Status</Typography>
                                <Chip 
                                    label={selectedBooking.status} 
                                    color={getStatusColor(selectedBooking.status)}
                                />
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default RecentBookings;