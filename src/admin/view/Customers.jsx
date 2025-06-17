import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Button,
    TextField,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';
import CustomersTable from '../components/Customers/CustomerTable';
import CustomerDetailDialog from '../components/Customers/CustomerDetailDialog';
import CustomerActionMenu from '../components/Customers/CustomerActionMenu';
import CustomerDeleteDialog from '../components/Customers/CustomerDeleteDialog';
import EditCustomerModal from '../components/Customers/EditCustomerModal';
import adminService from '../services/adminService';
import { useAuth } from '../context/AuthContext';
const CustomersManagement = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await adminService.getAllCustomers(token);
            setCustomers(data);
            setFilteredCustomers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setLoading(false);
            setSnackbar({
                open: true,
                message: 'Gagal memuat data pelanggan',
                severity: 'error'
            });
        }
    };


    const handleEditCustomer = async (updatedCustomer) => {
        try {
            setLoading(true);
            // 1. Simpan data customer dulu
            await adminService.updateCustomer(updatedCustomer.id, updatedCustomer, token);

            // 2. Simpan kendaraan baru (jika ada)
            for (const vehicle of updatedCustomer.vehicles) {
                if (!vehicle.id) {
                    // Jika kendaraan baru (tidak punya id)
                    await adminService.addMotorcycle({
                        user_id: updatedCustomer.id,
                        brand: vehicle.brand,
                        model: vehicle.model,
                        year: vehicle.year,
                        license_plate: vehicle.license_plate
                    }, token);
                }
            }

            await fetchCustomers(); // Refresh data
            setSnackbar({
                open: true,
                message: 'Data pelanggan berhasil diperbarui',
                severity: 'success'
            });
            setOpenEditModal(false);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Gagal memperbarui data pelanggan',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await adminService.deleteCustomer(currentCustomer.id, token);
            await fetchCustomers(); // Refresh data
            setSnackbar({
                open: true,
                message: 'Pelanggan berhasil dihapus',
                severity: 'success'
            });
            setOpenDeleteDialog(false);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Gagal menghapus pelanggan',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = async (customer) => {
        try {
            setLoading(true);
            const detail = await adminService.getCustomerDetail(customer.id, token); // ✅ token dikirim
            console.log('✅ Detail fetched from backend:', detail);

            setCurrentCustomer(detail);
            setOpenDetail(true);
        } catch (error) {
            console.error('❌ Gagal memuat detail pelanggan:', {
                message: error.message,
                response: error.response?.data
            });
            setSnackbar({
                open: true,
                message: 'Gagal memuat detail pelanggan',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manajemen Pelanggan</h1>
        </div>

        <Paper className="p-4 mb-6">
            <div className="flex items-center space-x-2">
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Cari pelanggan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                startAdornment: <Search style={{ marginRight: 8 }} />
                }}
            />
            <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => setSearchTerm('')}
            >
                Reset
            </Button>
            </div>
        </Paper>

        <CustomersTable 
            customers={filteredCustomers}
            loading={loading}
            onMenuOpen={(e, customer) => {
                setAnchorEl(e.currentTarget);
                setCurrentCustomer(customer);
            }}
        />

        <CustomerActionMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            onViewDetail={() => {
                const selected = currentCustomer;        // Simpan sementara
                setAnchorEl(null);                       // ❗️Tutup menu dulu
                setTimeout(() => {
                handleViewDetail(selected);            // Lalu buka detail
                }, 150); // Delay kecil agar transisi smooth
            }}
            onEdit={async () => {
                setAnchorEl(null); // Tutup menu

                try {
                    const detail = await adminService.getCustomerDetail(currentCustomer.id, token);
                    setEditingCustomer(detail);
                    setOpenEditModal(true);
                } catch (error) {
                    console.error("❌ Gagal memuat data edit:", error);
                    setSnackbar({
                    open: true,
                    message: 'Gagal memuat data pelanggan untuk edit',
                    severity: 'error'
                    });
                }
            }}

            onDelete={() => {
                setAnchorEl(null);
                setOpenDeleteDialog(true);
            }}
        />


        <CustomerDetailDialog
            open={openDetail}
            onClose={() => setOpenDetail(false)}
            customer={currentCustomer}
            loading={loading}
            onEdit={() => {
                setOpenDetail(false);
                navigate(`/admin/customers/edit/${currentCustomer.id}`);
            }}
        />

        <CustomerDeleteDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            customer={currentCustomer}
            loading={loading}
            onDelete={handleDelete}
        />

        <EditCustomerModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        customer={editingCustomer}
        onSave={handleEditCustomer}
        onSuccess={fetchCustomers}
        />

        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            >
            {snackbar.message}
            </Alert>
        </Snackbar>
        </div>
    );
};

export default CustomersManagement;