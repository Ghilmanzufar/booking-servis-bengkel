import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ServiceSelection from "./ServiceSelection";
import ProductSelection from "./ProductSelection";
import DateTimeSelection from "./DateTimeSelection";
import MotorcycleSelection from "./MotorcycleSelection";
import ComplaintSection from "./ComplaintSection";
import PaymentSummary from "./PaymentSummary";
import PaymentMethod from "./PaymentMethod";
import QrisModal from "./QrisModal";
import { FaMotorcycle, FaUser, FaCheck, FaClock } from "react-icons/fa";

const BookingFormSection = ({ motorcycles, initialServiceId }) => {
    const [formData, setFormData] = useState({
        service_id: initialServiceId || '',
        product_id: '',
        tanggal: '',
        waktu: '',
        motorId: '',
        keluhan: ''
    });
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [services, setServices] = useState([]);
    const [serviceProducts, setServiceProducts] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [availableSlots, setAvailableSlots] = useState(10);
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentProof, setPaymentProof] = useState(null);
    const [paymentProofPreview, setPaymentProofPreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showQrisModal, setShowQrisModal] = useState(false);
    const [totalPayment, setTotalPayment] = useState(0);
    const navigate = useNavigate();

    // Fetch services data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/services')
                ]);
                
                setServices(servicesRes.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                toast.error('Gagal memuat data layanan servis');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch products when service is selected
    useEffect(() => {
        if (formData.service_id) {
            const fetchProducts = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/services/${formData.service_id}/products`);
                    setServiceProducts(res.data);
                    
                    const service = services.find(s => s.id.toString() === formData.service_id);
                    setSelectedService(service);
                } catch (err) {
                    console.error('Error fetching products:', err);
                    setServiceProducts([]);
                }
            };
            
            fetchProducts();
        } else {
            setServiceProducts([]);
            setSelectedService(null);
        }
    }, [formData.service_id, services]);

    // Check availability when date changes
    useEffect(() => {
        if (formData.tanggal) {
            const checkAvailability = async () => {
                setIsCheckingAvailability(true);
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(
                        `http://localhost:5000/api/bookings/availability?date=${formData.tanggal}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    setAvailableSlots(10 - response.data.count);
                } catch (err) {
                    console.error('Error checking availability:', err);
                    toast.error('Gagal memeriksa ketersediaan slot');
                } finally {
                    setIsCheckingAvailability(false);
                }
            };
            
            checkAvailability();
        }
    }, [formData.tanggal]);

    // Calculate total payment
    useEffect(() => {
        let total = 0;
        
        if (formData.service_id) {
            const service = services.find(s => s.id.toString() === formData.service_id);
            if (service && !service.has_products) {
                total += parseFloat(service.current_price) || 0;
            }
        }
        
        if (formData.product_id) {
            const product = serviceProducts.find(p => String(p.id) === String(formData.product_id));
            if (product) {
                total += parseFloat(product.price) || 0;
            }
        }
        
        setTotalPayment(total);
    }, [formData.service_id, formData.product_id, services, serviceProducts]);

        // Tambahkan useEffect untuk menangani perubahan initialServiceId
    useEffect(() => {
        if (initialServiceId) {
            setFormData(prev => ({
                ...prev,
                service_id: initialServiceId
            }));
        }
    }, [initialServiceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'motorId') {
            const motor = motorcycles.find(m => m.id.toString() === value);
            setSelectedMotor(motor || null);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProductSelect = (productId) => {
        setFormData(prev => ({
            ...prev,
            product_id: productId
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation checks
        if (!formData.service_id || !formData.tanggal || !formData.waktu || !formData.motorId) {
            toast.error('Harap lengkapi semua field yang wajib diisi');
            return;
        }

        if (selectedService?.has_products && !formData.product_id) {
                toast.error('Harap pilih produk untuk layanan ini');
            return;
        }

        if (availableSlots <= 0) {
            toast.error('Maaf, slot booking untuk hari ini sudah penuh');
            return;
        }

        if (!paymentMethod) {
            toast.error('Harap pilih metode pembayaran');
            return;
        }

        if (paymentMethod !== 'cash' && !paymentProof) {
            toast.error('Harap upload bukti pembayaran');
            return;
        }

        try {
            setIsUploading(true);
            const token = localStorage.getItem('token');

            const timeParts = formData.waktu.split(':');
            const formattedTime = timeParts.map(part => part.padStart(2, '0')).join(':');

            const formDataToSend = new FormData();
            formDataToSend.append('motorcycle_id', formData.motorId);
            formDataToSend.append('service_id', formData.service_id);
            formDataToSend.append('booking_date', formData.tanggal);
            formDataToSend.append('booking_time', formattedTime);
            formDataToSend.append('complaint', formData.keluhan || '');
            formDataToSend.append('payment_method', paymentMethod);

            if (formData.product_id) {
                const selectedProduct = serviceProducts.find(p => String(p.id) === String(formData.product_id));
                if (selectedProduct) {
                    const productsData = [{
                            id: selectedProduct.id,
                            price: selectedProduct.price,
                        quantity: 1
                    }];
                    formDataToSend.append('products', JSON.stringify(productsData));
                }
            }

            if (paymentProof) {
                formDataToSend.append('payment_proof', paymentProof);
            }

            await axios.post('http://localhost:5000/api/bookings', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Booking berhasil dibuat!');
            navigate('/profile');
        } catch (error) {
            console.error('Error creating booking:', error);
            const errorMsg = error.response?.data?.message || 'Gagal membuat booking';
            
            if (errorMsg.includes('Booking hanya bisa antara jam')) {
                toast.error('Waktu booking harus antara 08:00-16:30');
            } else if (errorMsg.includes('Kami tutup pada hari Minggu')) {
                toast.error('Tidak bisa booking pada hari Minggu');
            } else if (errorMsg.includes('maksimal 3 bulan')) {
                toast.error('Booking maksimal 3 bulan ke depan');
            } else if (errorMsg.includes('Layanan servis tidak valid')) {
                toast.error('Layanan servis tidak valid');
            } else if (errorMsg.includes('Tanggal booking tidak boleh di masa lalu')) {
                toast.error('Tidak bisa memilih tanggal di masa lalu');
            }else if (errorMsg.includes('Hanya file gambar')) {
                toast.error('Format file tidak didukung. Hanya JPEG, JPG, PNG, atau PDF yang diperbolehkan');
            } else {
                toast.error(errorMsg);
            }
        }
    };

    const handlePaymentProofChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPaymentProof(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPaymentProofPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatPrice = (price) => {
        if (!price) return "-";
        const priceStr = price % 1 === 0 ? price.toString() : price.toFixed(2);
        return priceStr.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    if (loading) return <div className="text-center py-8">Memuat data...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <section className="flex flex-col md:flex-row gap-10 justify-between px-8 py-12 bg-gray-100 rounded-xl">
            {/* Judul */}
            <div className="md:w-1/3">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Form Booking Servis</h2>
                <p className="text-gray-600">
                    Lengkapi data di bawah ini untuk melakukan booking servis motor Anda.
                </p>
            </div>

            {/* Form Booking */}
            <div className="md:w-2/3 bg-white p-8 rounded-lg shadow">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <ServiceSelection 
                        services={services} 
                        formData={formData} 
                        handleChange={handleChange} 
                        formatPrice={formatPrice}
                    />

                    {Boolean(selectedService?.has_products) && (
                        <ProductSelection 
                            serviceProducts={serviceProducts} 
                            formData={formData} 
                            handleProductSelect={handleProductSelect}
                            formatPrice={formatPrice}
                        />
                    )}

                    <DateTimeSelection 
                        formData={formData} 
                        handleChange={handleChange} 
                        availableSlots={availableSlots} 
                        isCheckingAvailability={isCheckingAvailability}
                    />

                    <MotorcycleSelection 
                        motorcycles={motorcycles} 
                        formData={formData} 
                        handleChange={handleChange} 
                        selectedMotor={selectedMotor}
                    />

                    <ComplaintSection 
                        formData={formData} 
                        handleChange={handleChange}
                    />

                    <PaymentSummary 
                        selectedService={selectedService} 
                        serviceProducts={serviceProducts} 
                        formData={formData} 
                        totalPayment={totalPayment} 
                        formatPrice={formatPrice}
                    />

                    <PaymentMethod 
                        paymentMethod={paymentMethod} 
                        setPaymentMethod={setPaymentMethod} 
                        paymentProof={paymentProof} 
                        paymentProofPreview={paymentProofPreview} 
                        handlePaymentProofChange={handlePaymentProofChange} 
                        setShowQrisModal={setShowQrisModal}
                    />

                    <div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition ${
                                motorcycles.length === 0 || isUploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={motorcycles.length === 0 || isUploading}
                        >
                            {isUploading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </span>
                            ) : motorcycles.length === 0 ? (
                                <span className="flex items-center justify-center gap-2">
                                    <FaMotorcycle /> Tambahkan motor terlebih dahulu
                                </span>
                            ) : (
                                "Konfirmasi Booking"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <QrisModal 
                showQrisModal={showQrisModal} 
                setShowQrisModal={setShowQrisModal} 
                totalPayment={totalPayment} 
                formatPrice={formatPrice}
            />
        </section>
    );
};

export default BookingFormSection;