import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Button
} from '@mui/material';
import { Delete, WhatsApp, Visibility } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import adminService from '../services/adminService';
import { toast } from 'react-hot-toast';

const ContactsManagement = () => {
    const { token } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, [token]);

    const fetchContacts = async () => {
        try {
        const data = await adminService.getAllContacts(token);
        setContacts(data);
        } catch (err) {
        console.error('Gagal memuat kontak:', err);
        toast.error('Gagal memuat data kontak');
        } finally {
        setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;
        try {
        await adminService.deleteContact(id, token);
        setContacts(contacts.filter(c => c.id !== id));
        toast.success('Pesan berhasil dihapus');
        } catch (err) {
        console.error(err);
        toast.error('Gagal menghapus pesan');
        }
    };

    const openDetail = (contact) => {
        setSelectedContact(contact);
        setDetailOpen(true);
    };

    const closeDetail = () => {
        setDetailOpen(false);
        setSelectedContact(null);
    };

    const formatPhone = (phone) => {
        if (!phone) return null;
        const normalized = phone.replace(/^0/, '62');
        return /^\d+$/.test(normalized) ? normalized : null;
    };

    return (
        <div>
        <Typography variant="h5" className="font-bold mb-6 text-gray-800">Kontak Masuk</Typography>

        {loading ? (
            <div className="flex justify-center items-center h-48">
            <CircularProgress />
            </div>
        ) : (
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Nomor HP</TableCell>
                    <TableCell>Pesan</TableCell>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Aksi</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {contacts.map((c, index) => (
                    <TableRow key={c.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.phone || '-'}</TableCell>
                    <TableCell>{c.message.slice(0, 30)}...</TableCell>
                    <TableCell>{new Date(c.created_at).toLocaleString('id-ID')}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => openDetail(c)}><Visibility /></IconButton>
                        {formatPhone(c.phone) && (
                        <IconButton 
                            onClick={() => window.open(`https://wa.me/${formatPhone(c.phone)}?text=Halo%20${encodeURIComponent(c.name)},%20kami%20telah%20menerima%20pesan%20dan%20saran%20Anda.`)}
                        >
                            <WhatsApp color="success" />
                        </IconButton>
                        )}
                        <IconButton onClick={() => handleDelete(c.id)}><Delete color="error" /></IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}

        {/* Detail Modal */}
        <Dialog open={detailOpen} onClose={closeDetail} fullWidth maxWidth="sm">
            <DialogTitle>Detail Pesan Kontak</DialogTitle>
            <DialogContent dividers>
            {selectedContact && (
                <div className="space-y-2">
                <Typography><strong>Nama:</strong> {selectedContact.name}</Typography>
                <Typography><strong>Email:</strong> {selectedContact.email}</Typography>
                <Typography><strong>Nomor HP:</strong> {selectedContact.phone || '-'}</Typography>
                <Typography><strong>Pesan:</strong> {selectedContact.message}</Typography>
                <Typography><strong>Dikirim:</strong> {new Date(selectedContact.created_at).toLocaleString('id-ID')}</Typography>
                </div>
            )}
            </DialogContent>
            <DialogActions>
            <Button onClick={closeDetail}>Tutup</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default ContactsManagement;
