import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

const CustomerVehiclesTab = ({ vehicles }) => {
    console.log('Vehicles data:', vehicles); // Debugging
    
    if (!vehicles || vehicles.length === 0) {
        return (
        <div className="text-center py-4 text-gray-500">
            Belum ada kendaraan terdaftar
        </div>
        );
    }

    return (
        <>
        <h3 className="font-medium mb-4">Daftar Kendaraan</h3>
        <TableContainer component={Paper}>
            <Table size="small">
            <TableHead>
                <TableRow>
                <TableCell>Jenis</TableCell>
                <TableCell>Merk/Model</TableCell>
                <TableCell>Plat Nomor</TableCell>
                <TableCell>Tahun</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {vehicles.map((vehicle, index) => (
                <TableRow key={vehicle.id || index}>
                    <TableCell>{vehicle.type || 'Motor'}</TableCell>
                    <TableCell>
                    {`${vehicle.brand || ''} ${vehicle.model || ''}`.trim() || '-'}
                    </TableCell>
                    <TableCell>{vehicle.plateNumber || vehicle.license_plate || '-'}</TableCell>
                    <TableCell>{vehicle.year || '-'}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default CustomerVehiclesTab;