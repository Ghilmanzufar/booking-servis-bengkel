import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Person, Edit, Delete } from '@mui/icons-material';

const CustomerActionMenu = ({
    anchorEl,
    open,
    onClose,
    onViewDetail,
    onEdit,
    onDelete
}) => (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <MenuItem onClick={onViewDetail}>
        <Person fontSize="small" className="mr-2" />
            Detail Pelanggan
        </MenuItem>
        <MenuItem onClick={onEdit}>
        <Edit fontSize="small" className="mr-2" />
            Edit
        </MenuItem>
        <MenuItem onClick={onDelete}>
        <Delete fontSize="small" className="mr-2" />
            Hapus
        </MenuItem>
    </Menu>
);

export default CustomerActionMenu;