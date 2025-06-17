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
    Chip
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const ServiceTable = ({ services, onMenuOpen }) => {
    return (
        <TableContainer component={Paper} elevation={1}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Layanan</TableCell>
                <TableCell>Harga</TableCell>
                <TableCell>Durasi</TableCell>
                <TableCell>Populer</TableCell>
                <TableCell>Dibuat</TableCell>
                <TableCell>Aksi</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {services.map((service) => (
                <TableRow key={service.id} hover>
                <TableCell>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                </TableCell>
                <TableCell>
                    Rp {Number(service.price).toLocaleString('id-ID')}
                </TableCell>
                <TableCell>{service.duration} menit</TableCell>
                <TableCell>
                    <Chip
                    label={service.isPopular ? 'Ya' : 'Tidak'}
                    color={service.isPopular ? 'success' : 'default'}
                    size="small"
                    />
                </TableCell>
                <TableCell>
                    {new Date(service.createdAt).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell>
                    <IconButton onClick={(e) => onMenuOpen(e, service)} size="small">
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

export default ServiceTable;
