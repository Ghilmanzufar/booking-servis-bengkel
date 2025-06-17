// components/Bookings/BookingDetailModal.jsx
import React from 'react';
import { Modal, Box, Typography, IconButton, Divider, Chip, ImageList, ImageListItem, Button } from '@mui/material';
import { Close, MonetizationOn, Payment, Edit } from '@mui/icons-material';

const modalStyle = {
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

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price || 0);
};

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'selesai': return 'success';
        case 'terjadwal': return 'primary';
        case 'diproses': return 'warning';
        case 'dibatalkan': return 'error';
        default: return 'default';
    }
};

const BookingDetailModal = ({ open, onClose, booking, bookingDetails,onEdit }) => {
    if (!booking || !bookingDetails) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <div className="flex justify-between items-start mb-4">
                    <Typography variant="h6">Detail Booking</Typography>
                    <IconButton onClick={onClose}><Close /></IconButton>
                </div>

                <div className="space-y-4">
                    <div>
                        <Typography variant="subtitle2">Pelanggan</Typography>
                        <Typography>{booking.customer}</Typography>
                        <Typography variant="body2" color="textSecondary">{booking.phone}</Typography>
                    </div>

                    <div>
                        <Typography variant="subtitle2">Motor</Typography>
                        <Typography>{booking.vehicle}</Typography>
                    </div>

                    <div>
                        <Typography variant="subtitle2">Layanan</Typography>
                        <Typography>{booking.service}</Typography>
                    </div>

                    <div>
                        <Typography variant="subtitle2">Waktu</Typography>
                        <Typography>{booking.date} - {booking.time}</Typography>
                    </div>

                    <div>
                        <Typography variant="subtitle2">Status</Typography>
                        <Chip label={booking.status} />
                    </div>

                    <div>
                        <Typography variant="subtitle2">Keluhan</Typography>
                        <Typography>{booking.notes}</Typography>
                    </div>

                    <Divider />

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

                    {bookingDetails.payment_proof && (
                        <div>
                            <Typography variant="subtitle2">Bukti Pembayaran</Typography>
                            <ImageList cols={1} sx={{ width: '100%', height: 200 }}>
                                <ImageListItem>
                                    <img
                                        src={`http://localhost:5000/uploads/payment_proofs/${bookingDetails.payment_proof}`}
                                        alt="Bukti"
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
                                {booking.service}
                            </Typography>
                            <Typography variant="body2">
                                {formatPrice(bookingDetails.service_price)}
                            </Typography>
                        </div>

                        {/* Produk tambahan */}
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

                        <Divider sx={{ my: 1 }} />
                        <div className="flex justify-between font-medium">
                            <Typography>Total</Typography>
                            <Typography>
                                {formatPrice(
                                    bookingDetails.service_price +
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
                            label={booking.status}
                            color={getStatusColor(booking.status)}
                            sx={{ mt: 1 }}
                        />
                    </div>

                    <Button variant="outlined" startIcon={<Edit />} onClick={() => onEdit(booking)}>
                        Edit Booking
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default BookingDetailModal;
