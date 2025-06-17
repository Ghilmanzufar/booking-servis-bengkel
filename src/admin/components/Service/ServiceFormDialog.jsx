import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Checkbox, FormControlLabel
} from '@mui/material';

const ServiceFormDialog = ({ open, onClose, onSubmit, formData, onChange, editing }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit Layanan' : 'Tambah Layanan'}</DialogTitle>

        <DialogContent dividers>
            <div className="space-y-4 mt-2">
            <TextField
                label="Nama Layanan"
                name="name"
                value={formData.name}
                onChange={onChange}
                fullWidth
                required
            />
            <TextField
                label="Durasi (menit)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={onChange}
                fullWidth
                required
            />
            <TextField
                label="Harga Sekarang (Current Price)"
                name="price"
                type="number"
                value={formData.price}
                onChange={onChange}
                fullWidth
                required
            />
            <TextField
                label="Harga Asli (Original Price)"
                name="original_price"
                type="number"
                value={formData.original_price}
                onChange={onChange}
                fullWidth
            />
            <TextField
                label="Rekomendasi Interval Servis (km)"
                name="recommended_interval"
                type="number"
                value={formData.recommended_interval}
                onChange={onChange}
                fullWidth
            />
            <TextField
                label="Deskripsi"
                name="description"
                value={formData.description}
                onChange={onChange}
                fullWidth
                multiline
                rows={3}
            />
            <TextField
                label="Keterangan / Fitur Layanan"
                name="features"
                value={formData.features}
                onChange={onChange}
                fullWidth
                multiline
                rows={3}
                helperText="Pisahkan dengan baris baru untuk tiap poin fitur."
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={formData.isPopular}
                    onChange={onChange}
                    name="isPopular"
                />
                }
                label="Tandai sebagai layanan populer"
            />
            </div>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button variant="contained" onClick={onSubmit}>
            {editing ? 'Simpan Perubahan' : 'Tambah'}
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default ServiceFormDialog;
