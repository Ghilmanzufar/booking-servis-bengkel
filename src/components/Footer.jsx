import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white shadow-sm dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl ml-2 font-semibold whitespace-nowrap dark:text-white">Bengkel Ghilman</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                <a href="/" className="hover:underline me-4 md:me-6">Home</a>
                </li>
                <li>
                <a href="/layanan" className="hover:underline me-4 md:me-6">Layanan Kami</a>
                </li>
                <li>
                <a href="booking" className="hover:underline me-4 md:me-6">Booking</a>
                </li>
                <li>
                <a href="tentang-kami" className="hover:underline">Tentang Kami</a>
                </li>
            </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="https://flowbite.com/" className="hover:underline">Bengkel Ghilman™</a>. Hotline : 088801238937 
            </span>
        </div>
        </footer>
    );
};

export default Footer;
