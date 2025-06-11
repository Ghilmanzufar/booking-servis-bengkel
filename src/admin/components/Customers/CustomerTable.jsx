import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Avatar,
    Chip,
    CircularProgress
    } from '@mui/material';
import { MoreVert, Phone,} from '@mui/icons-material';

    const CustomersTable = ({ customers, loading, onMenuOpen }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Pelanggan</TableCell>
                    <TableCell>Kontak</TableCell>
                    <TableCell>Bergabung</TableCell>
                    <TableCell>Total Booking</TableCell>
                    <TableCell>Aksi</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id} hover>
                    <TableCell>
                        <div className="flex items-center">
                        <Avatar className="mr-3">
                            {customer.name.charAt(0)}
                        </Avatar>
                        <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="space-y-1">
                        <div className="flex items-center">
                            <Phone fontSize="small" className="mr-1" />
                            {customer.phone}
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        {new Date(customer.joinDate).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                        <Chip 
                        label={customer.bookingCount || 0} 
                        color="primary" 
                        size="small" 
                        />
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={(e) => onMenuOpen(e, customer)} size="small">
                        <MoreVert />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomersTable;