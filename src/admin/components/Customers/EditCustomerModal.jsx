import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    CircularProgress,
    Avatar,
    IconButton,
    Chip
} from '@mui/material';
import { Person, Phone, Email, Home, TwoWheeler, Close, Add } from '@mui/icons-material';

const EditCustomerModal = ({ open, onClose, customer, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        vehicles: []
    });
    const [loading, setLoading] = useState(false);

    // Inisialisasi form data saat customer berubah
    useEffect(() => {
        if (customer) {
        setFormData({
            name: customer.name || '',
            phone: customer.phone || '',
            email: customer.email || '',
            address: customer.address || '',
            vehicles: customer.vehicles ? [...customer.vehicles] : []
        });
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleVehicleChange = (index, e) => {
        const { name, value } = e.target;
        const newVehicles = [...formData.vehicles];
        newVehicles[index][name] = value;
        
        setFormData(prev => ({
        ...prev,
        vehicles: newVehicles
        }));
    };

    const addVehicle = () => {
        setFormData(prev => ({
        ...prev,
        vehicles: [
            ...prev.vehicles,
            { brand: '', model: '', plateNumber: '', year: '' }
        ]
        }));
    };

    const removeVehicle = (index) => {
        const newVehicles = [...formData.vehicles];
        newVehicles.splice(index, 1);
        
        setFormData(prev => ({
        ...prev,
        vehicles: newVehicles
        }));
    };

    const handleSubmit = async () => {
        try {
        setLoading(true);
        await onSave({
            ...customer, // Mempertahankan data yang tidak diubah
            ...formData  // Data yang diupdate
        });
        onClose();
        } catch (error) {
        console.error('Error updating customer:', error);
        } finally {
        setLoading(false);
        }
    };

    if (!customer) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
            <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Avatar className="mr-2 bg-blue-500">
                <Person />
                </Avatar>
                Edit Pelanggan: {customer.name}
            </div>
            <IconButton onClick={onClose}>
                <Close />
            </IconButton>
            </div>
        </DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={3} className="mt-2">
            {/* Informasi Dasar */}
            <Grid item xs={12} md={6}>
                <div className="space-y-4">
                <TextField
                    fullWidth
                    label="Nama Lengkap"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    InputProps={{
                    startAdornment: <Person className="mr-2 text-gray-500" />
                    }}
                />
                <TextField
                    fullWidth
                    label="Nomor Telepon"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    InputProps={{
                    startAdornment: <Phone className="mr-2 text-gray-500" />
                    }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                    startAdornment: <Email className="mr-2 text-gray-500" />
                    }}
                />
                <TextField
                    fullWidth
                    label="Alamat"
                    name="address"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    InputProps={{
                    startAdornment: <Home className="mr-2 text-gray-500" />
                    }}
                />
                <div className="flex items-center">
                    <Chip 
                    label={`Bergabung: ${new Date(customer.joinDate).toLocaleDateString('id-ID')}`} 
                    variant="outlined"
                    />
                </div>
                </div>
            </Grid>

            {/* Kendaraan */}
            <Grid item xs={12} md={6}>
                <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium">Data Kendaraan</h3>
                    <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<Add />}
                    onClick={addVehicle}
                    >
                    Tambah
                    </Button>
                </div>

                {formData.vehicles.map((vehicle, index) => (
                    <div key={index} className="border p-4 rounded-lg space-y-3 relative">
                    <IconButton 
                        className="absolute top-1 right-1 text-red-500"
                        size="small"
                        onClick={() => removeVehicle(index)}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                    
                    <TextField
                        fullWidth
                        label="Merek"
                        name="brand"
                        value={vehicle.brand}
                        onChange={(e) => handleVehicleChange(index, e)}
                        InputProps={{
                        startAdornment: <TwoWheeler className="mr-2 text-gray-500" />
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Model"
                        name="model"
                        value={vehicle.model}
                        onChange={(e) => handleVehicleChange(index, e)}
                    />
                    <TextField
                        fullWidth
                        label="Nomor Plat"
                        name="plateNumber"
                        value={vehicle.plateNumber}
                        onChange={(e) => handleVehicleChange(index, e)}
                    />
                    <TextField
                        fullWidth
                        label="Tahun"
                        name="year"
                        type="number"
                        value={vehicle.year}
                        onChange={(e) => handleVehicleChange(index, e)}
                        inputProps={{ 
                        min: 1990, 
                        max: new Date().getFullYear() 
                        }}
                    />
                    </div>
                ))}

                {formData.vehicles.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                    Belum ada kendaraan terdaftar
                    </div>
                )}
                </div>
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="inherit">
            Batal
            </Button>
            <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default EditCustomerModal;