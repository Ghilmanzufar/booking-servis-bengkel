// ServicesPage.jsx (versi final dengan tambah/edit layanan dalam 1 modal)
import { useState, useEffect } from 'react';
import ServiceTable from '../components/Service/ServiceTable';
import ServiceFormDialog from '../components/Service/ServiceFormDialog';
import ServiceDeleteDialog from '../components/Service/ServiceDeleteDialog';
import ServiceProductModal from '../components/Service/ServiceProductModal';
import ServiceActionMenu from '../components/Service/ServiceActionMenu';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';

export default function ServicesPage() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
    original_price: '',
    description: '',
    isPopular: false,
    features: ''
  });

  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentService, setCurrentService] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://be.booking-servis-motor.biz.id/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setServices(data);
      setFilteredServices(data);
    } catch (err) {
      console.error('Gagal fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAdd = () => {
    // handleAdd
    setFormData({
      name: '',
      duration: '',
      price: '',
      original_price: '',
      description: '',
      recommended_interval: '',
      isPopular: false,
      features: ''
    });
    setCurrentService(null);
    setOpenForm(true);
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      duration: service.duration,
      price: service.price,
      original_price: service.original_price || '',
      description: service.description,
      recommended_interval: service.recommended_interval || '',
      isPopular: service.isPopular,
      features: service.features?.join('\n') || ''
    });
    setCurrentService(service);
    setOpenForm(true);
  };

  const handleDeleteClick = (service) => {
    setCurrentService(service);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!currentService?.id) return;
    try {
      const res = await fetch(`https://be.booking-servis-motor.biz.id/api/admin/services/${currentService.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Gagal menghapus layanan');

      fetchServices();
      setOpenDeleteDialog(false);
      setCurrentService(null);
    } catch (err) {
      console.error('Gagal menghapus layanan:', err);
      alert('Gagal menghapus layanan');
    }
  };


  const handleMenuOpen = (e, service) => {
    setAnchorEl(e.currentTarget);
    setCurrentService(service);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    try {
      const cleanedFeatures = formData.features
        .split('\n')
        .map(f => f.trim())
        .filter(f => f !== '');

      const payload = {
        ...formData,
        features: cleanedFeatures,
        isPopular: !!formData.isPopular
      };

      const url = currentService
        ? `https://be.booking-servis-motor.biz.id/api/admin/services/${currentService.id}`
        : `https://be.booking-servis-motor.biz.id/api/admin/services`;

      const method = currentService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Gagal');

      fetchServices();
      setOpenForm(false);
      setCurrentService(null);
    } catch (err) {
      console.error('Gagal menyimpan layanan:', err);
      alert('Terjadi kesalahan saat menyimpan layanan');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manajemen Layanan</h2>
        <Button variant="contained" onClick={handleAdd}>
          Tambah Layanan
        </Button>
      </div>

      <ServiceTable
        services={filteredServices}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onMenuOpen={handleMenuOpen}
        onManageProducts={(service) => {
          setCurrentService(service);
          setProductModalOpen(true);
        }}
      />

      <ServiceFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        formData={formData}
        onChange={handleFormChange}
        editing={Boolean(currentService)}
        onSubmit={handleSubmit}
      />

      <ServiceDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        service={currentService}
      />


      <ServiceProductModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        service={currentService}
      />

      <ServiceActionMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onEdit={() => {
          handleMenuClose();
          handleEdit(currentService);
        }}
        onDelete={() => {
          handleMenuClose();
          handleDeleteClick(currentService);
        }}
        onManageProducts={() => {
          handleMenuClose();
          setProductModalOpen(true);
        }}
      />
    </div>
  );
}