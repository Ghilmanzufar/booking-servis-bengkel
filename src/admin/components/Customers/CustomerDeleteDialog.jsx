import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress
} from '@mui/material';
import { Close, Delete } from '@mui/icons-material';

const CustomerDeleteDialog = ({
    open,
    onClose,
    customer,
    loading,
    onDelete
}) => (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
        Apakah Anda yakin ingin menghapus pelanggan "{customer?.name}"?
        <br />
        Semua data terkait (kendaraan, booking) juga akan dihapus.
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose} startIcon={<Close />}>
            Batal
        </Button>
        <Button
            onClick={onDelete}
            variant="contained"
            color="error"
            startIcon={<Delete />}
            disabled={loading}
        >
            {loading ? <CircularProgress size={24} /> : 'Hapus'}
        </Button>
        </DialogActions>
    </Dialog>
);

export default CustomerDeleteDialog;