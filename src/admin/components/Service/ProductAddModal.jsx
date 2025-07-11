    // components/Service/ProductAddModal.jsx
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Typography
} from '@mui/material';
import { useState } from 'react';

const ProductAddModal = ({ open, onClose, serviceId, token, onSuccess }) => {
    const [form, setForm] = useState({
        name: '',
        brand: '',
        price: '',
        description: '',
        imageFile: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
        setForm({ ...form, imageFile: files[0] });
        } else {
        setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async () => {
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('brand', form.brand);
        fd.append('price', form.price);
        fd.append('description', form.description);
        if (form.imageFile) {
        fd.append('image', form.imageFile);
        }

        try {
        const res = await fetch(`https://be.booking-servis-motor.biz.id/api/admin/services/${serviceId}/products`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${token}`
            },
            body: fd
        });

        if (!res.ok) throw new Error('Gagal tambah produk');
        onSuccess(); // trigger reload
        onClose();   // close modal
        setForm({ name: '', brand: '', price: '', description: '', imageFile: null });
        } catch (err) {
        console.error('Gagal simpan produk:', err);
        alert('Gagal simpan produk');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Tambah Produk</DialogTitle>
        <DialogContent dividers className="space-y-4 mt-2">
            <TextField label="Nama Produk" name="name" value={form.name} onChange={handleChange} fullWidth />
            <TextField label="Brand" name="brand" value={form.brand} onChange={handleChange} fullWidth />
            <TextField label="Harga" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
            <TextField label="Deskripsi" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={2} />
            <div>
            <Typography variant="subtitle2">Upload Foto</Typography>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button variant="contained" onClick={handleSubmit}>Simpan</Button>
        </DialogActions>
        </Dialog>
    );
};

export default ProductAddModal;
