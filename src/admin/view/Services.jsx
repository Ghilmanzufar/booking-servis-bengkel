import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Menu,
    MenuItem,
    Switch,
    FormControl,
    InputLabel,
    Select,
    Chip,
    CircularProgress,
    Snackbar,
    Alert
    } from '@mui/material';
    import {
    Add,
    Edit,
    Delete,
    MoreVert,
    Check,
    Close,
    LocalOffer,
    Schedule,
    Build,
    Star
    } from '@mui/icons-material';

    const ServicesManagement = () => {
    // State untuk data dan UI
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentService, setCurrentService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        duration: 60,
        price: 0,
        description: '',
        isPopular: false
    });

    // Kategori layanan
    const categories = [
        'Perawatan Rutin',
        'Perbaikan',
        'Ganti Part',
        'Tune Up',
        'Lainnya'
    ];

    // Fetch data (simulasi API)
    useEffect(() => {
        const fetchServices = async () => {
        try {
            setLoading(true);
            // Simulasi API call
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const mockData = [
            {
                id: 1,
                name: 'Ganti Oli Mesin',
                category: 'Perawatan Rutin',
                duration: 30,
                price: 150000,
                description: 'Ganti oli mesin termasuk filter oli',
                isPopular: true,
                createdAt: '2023-05-10'
            },
            {
                id: 2,
                name: 'Servis Besar',
                category: 'Perawatan Rutin',
                duration: 120,
                price: 500000,
                description: 'Servis komprehensif termasuk ganti oli, filter, dan pengecekan komponen utama',
                isPopular: true,
                createdAt: '2023-05-15'
            },
            // Data lainnya...
            ];
            
            setServices(mockData);
            setFilteredServices(mockData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setLoading(false);
            showSnackbar('Gagal memuat data layanan', 'error');
        }
        };

        fetchServices();
    }, []);

    // Filter services berdasarkan search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
        setFilteredServices(services);
        } else {
        const filtered = services.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredServices(filtered);
        }
    }, [searchTerm, services]);

    // Handler untuk snackbar/notifikasi
    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    // Handler untuk form
    const handleOpenForm = (service = null) => {
        setCurrentService(service);
        if (service) {
        setFormData({
            name: service.name,
            category: service.category,
            duration: service.duration,
            price: service.price,
            description: service.description,
            isPopular: service.isPopular
        });
        } else {
        setFormData({
            name: '',
            category: '',
            duration: 60,
            price: 0,
            description: '',
            isPopular: false
        });
        }
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        // Validasi form
        if (!formData.name || !formData.category || !formData.duration || !formData.price) {
        showSnackbar('Harap isi semua field yang wajib', 'error');
        return;
        }

        // Simulasi API call
        setLoading(true);
        setTimeout(() => {
        if (currentService) {
            // Update existing service
            const updatedServices = services.map(service =>
            service.id === currentService.id ? { ...service, ...formData } : service
            );
            setServices(updatedServices);
            showSnackbar('Layanan berhasil diperbarui');
        } else {
            // Add new service
            const newService = {
            id: Math.max(...services.map(s => s.id), 0) + 1,
            ...formData,
            createdAt: new Date().toISOString()
            };
            setServices([...services, newService]);
            showSnackbar('Layanan baru berhasil ditambahkan');
        }
        setLoading(false);
        setOpenForm(false);
        }, 800);
    };

    // Handler untuk menu aksi
    const handleMenuOpen = (event, service) => {
        setAnchorEl(event.currentTarget);
        setCurrentService(service);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handler untuk delete
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
        handleMenuClose();
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDelete = () => {
        // Simulasi API call
        setLoading(true);
        setTimeout(() => {
        setServices(services.filter(service => service.id !== currentService.id));
        setLoading(false);
        setOpenDeleteDialog(false);
        showSnackbar('Layanan berhasil dihapus');
        }, 800);
    };

    // Toggle popular status
    const togglePopular = (id) => {
        setServices(services.map(service =>
        service.id === id ? { ...service, isPopular: !service.isPopular } : service
        ));
        showSnackbar('Status populer diperbarui');
    };

    return (
        <div className="p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manajemen Layanan</h1>
            <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenForm()}
            >
            Tambah Layanan
            </Button>
        </div>

        {/* Search Bar */}
        <Paper className="p-4 mb-6">
            <TextField
            fullWidth
            variant="outlined"
            placeholder="Cari layanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
                // startAdornment: <Search style={{ marginRight: 8 }} />
            }}
            />
        </Paper>

        {/* Services Table */}
        {loading ? (
            <div className="flex justify-center items-center h-64">
            <CircularProgress />
            </div>
        ) : (
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Nama Layanan</TableCell>
                    <TableCell>Kategori</TableCell>
                    <TableCell align="right">Durasi (menit)</TableCell>
                    <TableCell align="right">Harga</TableCell>
                    <TableCell>Popular</TableCell>
                    <TableCell>Dibuat</TableCell>
                    <TableCell>Aksi</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                    <TableCell>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">{service.description}</div>
                    </TableCell>
                    <TableCell>
                        <Chip label={service.category} size="small" />
                    </TableCell>
                    <TableCell align="right">
                        <div className="flex items-center justify-end">
                        <Schedule fontSize="small" className="mr-1" />
                        {service.duration}
                        </div>
                    </TableCell>
                    <TableCell align="right">
                        <div className="flex items-center justify-end">
                        <LocalOffer fontSize="small" className="mr-1" />
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(service.price)}
                        </div>
                    </TableCell>
                    <TableCell>
                        <Switch
                        checked={service.isPopular}
                        onChange={() => togglePopular(service.id)}
                        color="primary"
                        icon={<Star fontSize="small" />}
                        checkedIcon={<Star fontSize="small" />}
                        />
                    </TableCell>
                    <TableCell>
                        {new Date(service.createdAt).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                        <IconButton
                        onClick={(e) => handleMenuOpen(e, service)}
                        size="small"
                        >
                        <MoreVert />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}

        {/* Action Menu */}
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleOpenForm(currentService)}>
            <Edit fontSize="small" className="mr-2" />
            Edit
            </MenuItem>
            <MenuItem onClick={handleOpenDeleteDialog}>
            <Delete fontSize="small" className="mr-2" />
            Hapus
            </MenuItem>
        </Menu>

        {/* Add/Edit Form Dialog */}
        <Dialog
            open={openForm}
            onClose={handleCloseForm}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
            {currentService ? 'Edit Layanan' : 'Tambah Layanan Baru'}
            </DialogTitle>
            <DialogContent dividers>
            <div className="grid grid-cols-1 gap-4 mt-2">
                <TextField
                label="Nama Layanan"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                fullWidth
                required
                />
                
                <FormControl fullWidth required>
                <InputLabel>Kategori</InputLabel>
                <Select
                    name="category"
                    value={formData.category}
                    label="Kategori"
                    onChange={handleFormChange}
                >
                    {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                
                <div className="grid grid-cols-2 gap-4">
                <TextField
                    label="Durasi (menit)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    InputProps={{
                    endAdornment: <Schedule fontSize="small" />
                    }}
                />
                
                <TextField
                    label="Harga"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    InputProps={{
                    startAdornment: 'Rp',
                    endAdornment: <LocalOffer fontSize="small" />
                    }}
                />
                </div>
                
                <TextField
                label="Deskripsi"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                multiline
                rows={3}
                fullWidth
                />
                
                <div className="flex items-center">
                <Switch
                    checked={formData.isPopular}
                    onChange={handleFormChange}
                    name="isPopular"
                    color="primary"
                />
                <span className="ml-2">Tandai sebagai layanan populer</span>
                </div>
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseForm}>Batal</Button>
            <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={<Check />}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Simpan'}
            </Button>
            </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            maxWidth="xs"
        >
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogContent>
            Apakah Anda yakin ingin menghapus layanan "{currentService?.name}"?
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDeleteDialog} startIcon={<Close />}>
                Batal
            </Button>
            <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                startIcon={<Delete />}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Hapus'}
            </Button>
            </DialogActions>
        </Dialog>

        {/* Snackbar Notifikasi */}
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            >
            {snackbar.message}
            </Alert>
        </Snackbar>
        </div>
    );
};

export default ServicesManagement;