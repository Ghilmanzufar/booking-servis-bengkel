// EditCustomerModal.jsx (final version with update vehicle support)
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Typography, IconButton
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const EditCustomerModal = ({ open, onClose, customer, onSuccess }) => {
    const { token } = useAuth();
    const [vehiclesToDelete, setVehiclesToDelete] = useState([]);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '',
        vehicles: []
    });

    useEffect(() => {
        if (customer) {
        setFormData({
            name: customer.name || '',
            email: customer.email || '',
            phone: customer.phone || '',
            vehicles: customer.vehicles || []
        });
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVehicleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedVehicles = [...formData.vehicles];
        updatedVehicles[index][name] = value;
        setFormData((prev) => ({ ...prev, vehicles: updatedVehicles }));
    };

    const addVehicle = () => {
        setFormData((prev) => ({
        ...prev,
        vehicles: [...prev.vehicles, { brand: '', model: '', year: '', license_plate: '' }]
        }));
    };

    const removeVehicle = (index) => {
        const removed = formData.vehicles[index];
        setFormData((prev) => {
            const updated = [...prev.vehicles];
            updated.splice(index, 1);
            return { ...prev, vehicles: updated };
        });

        // Jika kendaraan sudah tersimpan di DB (punya id), tandai untuk dihapus
        if (removed.id) {
            setVehiclesToDelete((prev) => [...prev, removed.id]);
        }
    };


    const handleSubmit = async () => {
        try {
        const updatedCustomer = { ...formData, id: customer.id };

        await adminService.updateCustomer(customer.id, {
            name: updatedCustomer.name,
            email: updatedCustomer.email,
            phone: updatedCustomer.phone
        }, token);

        for (const vehicle of updatedCustomer.vehicles) {
            if (!vehicle.id) {
            await adminService.addMotorcycle({
                user_id: updatedCustomer.id,
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                license_plate: vehicle.license_plate
            }, token);
            } else {
            await adminService.updateMotorcycle(vehicle.id, {
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                license_plate: vehicle.license_plate
            }, token);
            }
        } 
        for (const id of vehiclesToDelete) {
            await adminService.deleteMotorcycle(id, token);
        }
        onSuccess();
        onClose();
        } catch (err) {
        console.error('Gagal update customer:', err);
        alert('Gagal update customer');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Pelanggan</DialogTitle>
        <DialogContent dividers>
            <div className="space-y-4 mt-2">
            <TextField label="Nama" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
            <TextField label="Telepon" name="phone" value={formData.phone} onChange={handleChange} fullWidth />

            <Typography variant="subtitle1" className="mt-4">Kendaraan</Typography>
            {formData.vehicles.map((v, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <TextField
                    label="Merk"
                    name="brand"
                    value={v.brand}
                    onChange={(e) => handleVehicleChange(i, e)}
                    fullWidth
                    className="col-span-3"
                />
                <TextField
                    label="Model"
                    name="model"
                    value={v.model}
                    onChange={(e) => handleVehicleChange(i, e)}
                    fullWidth
                    className="col-span-3"
                />
                <TextField
                    label="Tahun"
                    name="year"
                    value={v.year}
                    onChange={(e) => handleVehicleChange(i, e)}
                    fullWidth
                    className="col-span-2"
                />
                <TextField
                    label="Plat Nomor"
                    name="license_plate"
                    value={v.license_plate}
                    onChange={(e) => handleVehicleChange(i, e)}
                    fullWidth
                    className="col-span-3"
                />
                <IconButton onClick={() => removeVehicle(i)} className="col-span-1">
                    <Delete fontSize="small" />
                </IconButton>
                </div>
            ))}

            <Button startIcon={<Add />} onClick={addVehicle} className="mt-2">
                Tambah Kendaraan
            </Button>
            </div>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose}>Batal</Button>
            <Button variant="contained" onClick={handleSubmit}>Simpan</Button>
        </DialogActions>
        </Dialog>
    );
};

export default EditCustomerModal;