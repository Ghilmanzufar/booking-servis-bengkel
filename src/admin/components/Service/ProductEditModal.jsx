// components/Service/ProductEditModal.jsx
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Typography
} from '@mui/material';
import { useState, useEffect } from 'react';

const ProductEditModal = ({ open, onClose, product, token, onSuccess }) => {
    const [form, setForm] = useState({
        name: '',
        brand: '',
        price: '',
        description: '',
        imageFile: null
    });

    useEffect(() => {
        if (product) {
        setForm({
            name: product.name || '',
            brand: product.brand || '',
            price: product.price || '',
            description: product.description || '',
            imageFile: null
        });
        }
    }, [product]);

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
        const res = await fetch(`https://be.booking-servis-motor.biz.id/api/admin/products/${product.id}`, {
            method: 'PUT',
            headers: {
            Authorization: `Bearer ${token}`
            },
            body: fd
        });

        if (!res.ok) throw new Error('Gagal update produk');
        onSuccess(); // reload list
        onClose();
        } catch (err) {
        console.error('Gagal update produk:', err);
        alert('Gagal update produk');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Produk</DialogTitle>
        <DialogContent dividers className="space-y-4 mt-2">
            <TextField label="Nama Produk" name="name" value={form.name} onChange={handleChange} fullWidth />
            <TextField label="Brand" name="brand" value={form.brand} onChange={handleChange} fullWidth />
            <TextField label="Harga" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
            <TextField label="Deskripsi" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={2} />
            
            <div>
            <Typography variant="subtitle2">Gambar Saat Ini</Typography>
            {product?.image_url ? (
                <img
                    src={`https://be.booking-servis-motor.biz.id/images/products/${product.image_url}`}
                    alt={product?.name || 'Foto Produk'}
                    style={{ width: 100, height: 60, objectFit: 'cover', marginBottom: 8 }}
                />
                ) : (
                <Typography variant="body2" color="textSecondary">Tidak ada gambar</Typography>
            )}
            </div>

            <div>
            <Typography variant="subtitle2">Ganti Foto</Typography>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button variant="contained" onClick={handleSubmit}>Simpan Perubahan</Button>
        </DialogActions>
        </Dialog>
    );
};

export default ProductEditModal;
