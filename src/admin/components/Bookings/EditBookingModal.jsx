// components/Bookings/EditBookingModal.jsx
import React, { useState, useEffect } from 'react';
import {
    Modal, Box, Typography, IconButton,
    TextField, MenuItem, Button
} from '@mui/material';
import { Close } from '@mui/icons-material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const EditBookingModal = ({ open, onClose, booking, onSave }) => {
    const [form, setForm] = useState({
        date: '',
        time: '',
        service: '',
        complaint: '',
        payment_method: ''
    });

    useEffect(() => {
        if (booking) {
            setForm({
                date: booking.date?.substring(0, 10) || '',
                time: booking.time || '',
                service: booking.service || '',
                complaint: booking.notes || ''
            });
        }
    }, [booking]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave({ ...form, id: booking.id });
    };

    if (!booking) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <div className="flex justify-between items-start mb-4">
                    <Typography variant="h6">Edit Booking</Typography>
                    <IconButton onClick={onClose}><Close /></IconButton>
                </div>

                <div className="space-y-4">
                    <TextField
                        label="Tanggal"
                        type="date"
                        name="date"
                        fullWidth
                        size="small"
                        value={form.date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Waktu"
                        type="time"
                        name="time"
                        fullWidth
                        size="small"
                        value={form.time}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Layanan"
                        name="service"
                        fullWidth
                        size="small"
                        value={form.service}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Keluhan"
                        name="complaint"
                        fullWidth
                        size="small"
                        multiline
                        rows={3}
                        value={form.complaint}
                        InputProps={{ readOnly: true }}
                    />

                    <Button variant="contained" fullWidth onClick={handleSubmit}>
                        Simpan Perubahan
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default EditBookingModal;
