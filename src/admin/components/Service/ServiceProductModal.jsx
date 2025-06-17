import {
    Dialog, DialogTitle, DialogContent, IconButton,
    Table, TableHead, TableBody, TableRow, TableCell,
    Typography, Button
} from '@mui/material';
import { Close, Edit, Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProductAddModal from './ProductAddModal';
import ProductEditModal from './ProductEditModal';
import DeleteConfirmDialog from './DeleteConfirmDialog';
const ServiceProductModal = ({ open, onClose, service }) => {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const confirmDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/products/${deleteTarget.id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Gagal menghapus');

            fetchProducts(); // reload data
            setDeleteOpen(false);
            setDeleteTarget(null);
        } catch (err) {
            console.error('Gagal hapus produk:', err);
            alert('Gagal menghapus produk');
        }
    };

    const fetchProducts = async () => {
        if (!service?.id) return;
        try {
        const res = await fetch(`http://localhost:5000/api/admin/services/${service.id}/products`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setProducts(data);
        } catch (err) {
        console.error('Gagal fetch produk:', err);
        }
    };

    useEffect(() => {
        if (open) fetchProducts();
    }, [open, service]);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditOpen(true);
    };

    return (
        <>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
            Produk untuk: {service?.name}
            <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                <Close />
            </IconButton>
            </DialogTitle>

            <DialogContent dividers>
            <div className="flex justify-between items-center mb-3">
                <Typography variant="subtitle1">Daftar Produk</Typography>
                <Button variant="contained" size="small" onClick={() => setAddOpen(true)}>
                Tambah Produk
                </Button>
            </div>

            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Nama</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Foto</TableCell>
                    <TableCell>Harga</TableCell>
                    <TableCell>Deskripsi</TableCell>
                    <TableCell>Aksi</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {products.map((p) => (
                    <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.brand}</TableCell>
                    <TableCell>
                        {p.image_url ? (
                        <img
                            src={`http://localhost:5000/images/products/${p.image_url}`}
                            alt={p.name}
                            style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
                        />
                        ) : '—'}
                    </TableCell>
                    <TableCell>Rp {Number(p.price).toLocaleString()}</TableCell>
                    <TableCell>{p.description}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => handleEditClick(p)}><Edit fontSize="small" /></IconButton>
                        <IconButton onClick={() => {
                            setDeleteTarget(p);
                            setDeleteOpen(true);
                            }}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </DialogContent>
        </Dialog>

        {/* Modal Tambah Produk */}
        <ProductAddModal
            open={addOpen}
            onClose={() => setAddOpen(false)}
            serviceId={service?.id}
            token={token}
            onSuccess={fetchProducts}
        />

        {/* Modal Edit Produk */}
        <ProductEditModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            product={selectedProduct}
            token={token}
            onSuccess={fetchProducts}
        />
        <DeleteConfirmDialog
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={confirmDelete}
            title={`Hapus produk "${deleteTarget?.name}"?`}
            description="Tindakan ini tidak bisa dibatalkan."
        />

        </>
    );
};

export default ServiceProductModal;
