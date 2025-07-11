import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BookingFormSection from "../components/BookingForm/Form";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const BookingForm = () => {
    const [motorcycles, setMotorcycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchMotorcycles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/motorcycles', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMotorcycles(response.data.motorcycles);
            } catch (err) {
                setError(err.response?.data?.message || 'Gagal memuat data motor');
            } finally {
                setLoading(false);
            }
        };

        fetchMotorcycles();
    }, []);

    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get('service_id');
    
    if (loading) return <div className="text-center py-8">Memuat data motor...</div>;
    if (error) return <div className="text-center py-8">Error: {error}</div>;

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <BookingFormSection motorcycles={motorcycles} initialServiceId={serviceId} />
            <Footer />
        </div>
    );
};

export default BookingForm;