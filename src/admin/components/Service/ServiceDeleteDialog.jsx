import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

const ServiceDeleteDialog = ({ open, onClose, onConfirm, service }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Konfirmasi Hapus</DialogTitle>

        <DialogContent dividers>
            <Typography>
            Apakah Anda yakin ingin menghapus layanan
            <strong> {service?.name}</strong>?
            </Typography>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button onClick={onConfirm} variant="contained" color="error">
            Hapus
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default ServiceDeleteDialog;
