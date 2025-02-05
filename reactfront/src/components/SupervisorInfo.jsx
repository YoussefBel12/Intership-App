

import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// Create a styled Card with a gradient background, white text, and hover zoom effect
const GradientCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[6],
    background: 'linear-gradient(45deg, #1976d2, #9c27b0)', // blue to purple gradient
    color: theme.palette.common.white,
    padding: theme.spacing(3),
    textAlign: 'center',
    width: '100%',
    maxWidth: 400,
    transition: 'transform 0.3s ease-in-out', // smooth transition for hover
    '&:hover': {
        transform: 'scale(1.05)', // zoom effect on hover
    },
}));

const SupervisorInfo = () => {
    const [supervisor, setSupervisor] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupervisor = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${config.baseApiUrl}/api/interns/supervisor`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSupervisor(response.data);
            } catch (err) {
                console.error('Error fetching supervisor:', err);
                setError('Failed to fetch supervisor information.');
            }
        };

        fetchSupervisor();
    }, []);

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!supervisor) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4,
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <GradientCard>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <SupervisorAccountIcon sx={{ fontSize: 80 }} />
                    </Box>
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        {supervisor.firstName} {supervisor.lastName}
                    </Typography>
                    <Typography variant="body1">{supervisor.email}</Typography>
                    {/* Add any additional supervisor details here */}
                </CardContent>
            </GradientCard>
        </Container>
    );
};

export default SupervisorInfo;
