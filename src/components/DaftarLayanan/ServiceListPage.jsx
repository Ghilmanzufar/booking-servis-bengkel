import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ServiceListPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://be.booking-servis-motor.biz.id/api/services');
        setServices(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleBooking = (serviceId) => {
    navigate(`/booking?service_id=${serviceId}`);
  };

  const formatPrice = (price) => {
      const priceStr = price % 1 === 0 ? price.toString() : price.toFixed(2);
      return priceStr.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
    
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <section className="mt-10 pb-10 px-4 sm:px-10 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">
          🛠️ Layanan Servis Motor Kami
        </h1>
        <p className="text-lg text-gray-600">
          Pilih layanan yang sesuai dengan kebutuhan motormu.
        </p>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            price={`Rp ${formatPrice(service.current_price)}`}
            originalPrice={`Rp ${formatPrice(service.original_price)}`}
            description={service.description}
            badge={service.is_popular ? "Populer" : null}
            features={service.features}
            onBooking={handleBooking}
          />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service, description, price, originalPrice, badge, features, onBooking }) => (
  <div className={`rounded-3xl p-8 xl:p-10 ${badge ? "ring-2 ring-blue-600" : "ring-1 ring-gray-200"}`}>
    <div className="flex items-center justify-between gap-x-4">
      <h3 className={`text-2xl font-semibold leading-8 ${badge ? "text-blue-600" : "text-gray-900"}`}>{service.name}</h3>
      {badge && (
        <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold text-blue-600">
          {badge}
        </p>
      )}
    </div>
    <p className="mt-4 text-base text-gray-600">{description}</p>
    <p className="mt-6 flex items-baseline gap-x-1">
      <span className="line-through text-2xl text-gray-500/70">{originalPrice}</span>
      <span className="text-3xl font-bold tracking-tight text-red-600">{price}</span>
    </p>
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      <button 
        onClick={() => onBooking(service.id)}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition">
        Booking Sekarang
      </button>
    </div>
    <ul className="mt-8 space-y-3 text-base text-gray-600">
      {features.map((f, i) => (
        <li key={i} className="flex gap-x-3">
          <CheckIcon />
          {f}
        </li>
      ))}
    </ul>
  </div>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-5 text-blue-600 flex-none"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default ServiceListPage;