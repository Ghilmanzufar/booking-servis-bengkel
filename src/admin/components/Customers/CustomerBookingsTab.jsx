import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from '@mui/material';

const CustomerBookingsTab = ({ bookings }) => {
    console.log('Bookings data:', bookings); // Debugging
    
    if (!bookings || bookings.length === 0) {
        return (
        <div className="text-center py-4 text-gray-500">
            Belum ada riwayat booking
        </div>
        );
    }

    return (
        <>
        <h3 className="font-medium mb-4">Riwayat Booking</h3>
        <TableContainer component={Paper}>
            <Table size="small">
            <TableHead>
                <TableRow>
                <TableCell>ID Booking</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Layanan</TableCell>
                <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bookings.map((booking, index) => {
                const date = booking.date || booking.booking_date;
                return (
                    <TableRow key={booking.id || index}>
                    <TableCell>#{booking.id || index + 1}</TableCell>
                    <TableCell>
                        {date ? new Date(date).toLocaleDateString('id-ID') : '-'}
                    </TableCell>
                    <TableCell>{booking.service || booking.service_name || '-'}</TableCell>
                    <TableCell>
                        <Chip
                        label={booking.status || 'unknown'}
                        size="small"
                        color={
                            booking.status === 'selesai' ? 'success' :
                            booking.status === 'diproses' ? 'primary' :
                            booking.status === 'terjadwal' ? 'warning' :
                            'error'
                        }
                        />
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default CustomerBookingsTab;