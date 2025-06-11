import React from 'react';
import { Phone, Email } from '@mui/icons-material';

const CustomerProfileTab = ({ customer }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
        <h3 className="font-medium mb-2">Informasi Pribadi</h3>
        <div className="space-y-3">
            <div>
            <p className="text-sm text-gray-500">Nama Lengkap</p>
            <p>{customer.name}</p>
            </div>
            <div>
            <p className="text-sm text-gray-500">Tanggal Bergabung</p>
            <p>
                {new Date(customer.joinDate).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                })}
            </p>
            </div>
        </div>
        </div>
        
        <div>
        <h3 className="font-medium mb-2">Kontak</h3>
        <div className="space-y-3">
            <div className="flex items-center">
            <Phone className="mr-2" fontSize="small" />
            <span>{customer.phone}</span>
            </div>
            <div className="flex items-center">
            <Email className="mr-2" fontSize="small" />
            <span>{customer.email || '-'}</span>
            </div>
        </div>
        </div>
    </div>
);

export default CustomerProfileTab;