import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Tabs,
    Tab,
    Avatar,
    CircularProgress
} from '@mui/material';
import CustomerProfileTab from './CustomerProfileTab';
import CustomerVehiclesTab from './CustomerVehiclesTab';
import CustomerBookingsTab from './CustomerBookingsTab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const CustomerDetailDialog = ({ 
    open, 
    onClose, 
    customer,
    loading 
    }) => {
    const [tabValue, setTabValue] = useState(0);

    // 🔍 Tambahkan log di sini:
    console.log('🟢 Customer:', customer);
    console.log('🟢 Vehicles:', customer?.vehicles);
    console.log('🟢 Bookings:', customer?.bookings);
    
    if (!customer) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
            <div className="flex items-center">
            <Avatar className="mr-3">{customer.name.charAt(0)}</Avatar>
            <span>Detail Pelanggan: {customer.name}</span>
            </div>
        </DialogTitle>
        <DialogContent dividers>
            {loading ? (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
            ) : (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={tabValue} 
                    onChange={(e, newValue) => setTabValue(newValue)}
                >
                    <Tab label="Profil" />
                    <Tab label="Kendaraan" />
                    <Tab label="Riwayat Booking" />
                </Tabs>
                </Box>
                
                <TabPanel value={tabValue} index={0}>
                <CustomerProfileTab customer={customer} />
                </TabPanel>
                
                <TabPanel value={tabValue} index={1}>
                <CustomerVehiclesTab vehicles={customer.vehicles || []} />
                </TabPanel>
                
                <TabPanel value={tabValue} index={2}>
                <CustomerBookingsTab bookings={customer.bookings || []} />
                </TabPanel>
            </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Tutup</Button>
        </DialogActions>
        </Dialog>
    );
};

export default CustomerDetailDialog;