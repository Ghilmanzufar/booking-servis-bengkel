import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Avatar, CircularProgress
} from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const EditProfileModal = ({ open, onClose, user, onUpdated }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        avatar: null,
    });
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData({
            name: user.name || '',
            phone: user.phone || '',
            avatar: null,
        });
        setPreview(user.avatar ? `https://be.booking-servis-motor.biz.id${user.avatar}` : '');
    }, [user]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, avatar: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        if (!formData.name.trim()) {
            toast.error('Nama tidak boleh kosong');
            return false;
        }
        if (formData.phone && !/^0\d{9,13}$/.test(formData.phone)) {
            toast.error('Format nomor WA tidak valid');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const token = localStorage.getItem('token');
        const data = new FormData();
        data.append('name', formData.name);
        data.append('phone', formData.phone);
        if (formData.avatar) data.append('avatar', formData.avatar);

        try {
            setLoading(true);
            await axios.put('https://be.booking-servis-motor.biz.id/api/users/profile', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const updatedUser = await axios.get('https://be.booking-servis-motor.biz.id/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.setItem('user', JSON.stringify(updatedUser.data.user));
            toast.success('Profil berhasil diperbarui');
            // Force navbar update: reload user
            window.location.reload(); // force refresh UI termasuk Navba
            onUpdated();
            onClose();
        } catch (err) {
            console.error('Update failed:', err);
            toast.error('Gagal memperbarui profil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Profil</DialogTitle>
            <DialogContent dividers className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar src={preview} sx={{ width: 56, height: 56 }} />
                    <Button variant="outlined" component="label">
                        Pilih Foto
                        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                </div>

                <TextField
                    label="Nama Lengkap"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Nomor WhatsApp"
                    name="phone"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Batal</Button>
                <Button onClick={handleSubmit} disabled={loading} variant="contained">
                    {loading ? <CircularProgress size={24} /> : 'Simpan'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileModal;
