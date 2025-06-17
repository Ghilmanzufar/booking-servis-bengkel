// components/common/DeleteConfirmDialog.jsx
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography
} from '@mui/material';

const DeleteConfirmDialog = ({ open, onClose, onConfirm, title = 'Konfirmasi Hapus', description = 'Apakah kamu yakin ingin menghapus item ini?' }) => {
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <Typography>{description}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button onClick={onConfirm} color="error" variant="contained">Hapus</Button>
        </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
