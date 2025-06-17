import React, { useState } from 'react';
import axios from 'axios';
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
    Typography,
    Divider,
    ImageList,
    ImageListItem
} from '@mui/material';
import { ChevronRight, TwoWheeler, Close, MonetizationOn, Payment } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const RecentBookings = ({ bookings = [] }) => {
    const [open, setOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleRowClick = async (booking) => {
        setSelectedBooking(booking);
        try {
            // Fetch detail booking dengan produk
            const response = await axios.get(`http://localhost:5000/api/admin/bookings/${booking.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setBookingDetails(response.data);
        } catch (error) {
            console.error('Error fetching booking details:', error);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBooking(null);
        setBookingDetails(null);
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

    const formatPrice = (price) => {
        if (!price) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
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
                    
                    {selectedBooking && bookingDetails && (
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

                            <Divider />

                            {/* Detail Pembayaran */}
                            <div>
                                <Typography variant="subtitle2" className="flex items-center">
                                    <Payment className="mr-1" /> Metode Pembayaran
                                </Typography>
                                <Typography>
                                    {bookingDetails.payment_method === 'cash'
                                        ? 'Tunai'
                                        : bookingDetails.payment_method === 'qris'
                                        ? 'QRIS'
                                        : 'Transfer'}
                                </Typography>
                            </div>

                            {/* Bukti Pembayaran jika ada */}
                            {bookingDetails.payment_proof && (
                                <div>
                                    <Typography variant="subtitle2">Bukti Pembayaran</Typography>
                                    <ImageList cols={1} sx={{ width: '100%', height: 200 }}>
                                        <ImageListItem>
                                            <img
                                                src={`http://localhost:5000/uploads/payment_proofs/${bookingDetails.payment_proof}`}
                                                alt="Bukti Pembayaran"
                                                loading="lazy"
                                                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                            />
                                        </ImageListItem>
                                    </ImageList>
                                </div>
                            )}

                            <Divider />

                            <div>
                                <Typography variant="subtitle2" className="flex items-center">
                                    <MonetizationOn className="mr-1" /> Rincian Harga
                                </Typography>

                                {/* Harga layanan */}
                                <div className="flex justify-between mt-2">
                                    <Typography variant="body2">
                                        {selectedBooking.service_name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {formatPrice(bookingDetails.service_price)}
                                    </Typography>
                                </div>

                                {/* Produk jika ada */}
                                {bookingDetails.products && bookingDetails.products.length > 0 && (
                                    <>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="subtitle2">Produk Tambahan</Typography>
                                        {bookingDetails.products.map((product, index) => (
                                            <div key={index} className="flex justify-between mt-1">
                                                <Typography variant="body2">
                                                    {product.name} ({product.quantity}x)
                                                </Typography>
                                                <Typography variant="body2">
                                                    {formatPrice(product.price * product.quantity)}
                                                </Typography>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* Total */}
                                <Divider sx={{ my: 1 }} />
                                <div className="flex justify-between font-medium">
                                    <Typography>Total</Typography>
                                    <Typography>
                                        {formatPrice(
                                            (bookingDetails.service_price || 0) +
                                            (bookingDetails.products?.reduce((sum, product) =>
                                                sum + (product.price * product.quantity), 0) || 0)
                                        )}
                                    </Typography>
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <Typography variant="subtitle2">Status</Typography>
                                <Chip 
                                    label={selectedBooking.status} 
                                    color={getStatusColor(selectedBooking.status)}
                                    sx={{ mt: 1 }}
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