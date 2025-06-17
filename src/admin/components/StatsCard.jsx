import React from 'react';
import { Paper, Typography } from '@mui/material';

const StatsCard = ({ title, value, change, icon, description }) => {
    const isPositive = parseFloat(change) >= 0;
    
    return (
        <Paper className="p-4 h-full">
        <div className="flex justify-between items-start">
            <div>
            <Typography variant="subtitle2" color="textSecondary">
                {title}
            </Typography>
            <Typography variant="h4" className="mt-1">
                {value}
            </Typography>
            <Typography 
                variant="caption" 
                className={`mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}
            >
                {change} dari periode sebelumnya
            </Typography>
            </div>
            <div className="text-2xl p-2 rounded-full bg-gray-100">
            {icon}
            </div>
        </div>
        <Typography variant="caption" color="textSecondary" className="mt-2 block">
            {description}
        </Typography>
        </Paper>
    );
};

export default StatsCard;