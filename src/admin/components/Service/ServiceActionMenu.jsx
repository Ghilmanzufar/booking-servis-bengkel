import React from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { Edit, Delete, Inventory2 } from '@mui/icons-material';

const ServiceActionMenu = ({
        anchorEl,
        onClose,
        onEdit,
        onDelete,
        onManageProducts
    }) => {
    const open = Boolean(anchorEl);

    return (
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
        <MenuItem onClick={onEdit}>
            <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={onDelete}>
            <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
            <ListItemText>Hapus</ListItemText>
        </MenuItem>
        <MenuItem onClick={onManageProducts}>
            <ListItemIcon><Inventory2 fontSize="small" /></ListItemIcon>
            <ListItemText>Kelola Produk</ListItemText>
        </MenuItem>
        </Menu>

        
    );
};

export default ServiceActionMenu;
