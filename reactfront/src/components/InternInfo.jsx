/*

import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

// Styled Card with gradient background and hover effect
const GradientCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[6],
    background: 'linear-gradient(45deg, #1976d2, #9c27b0)', // Blue to purple gradient
    color: theme.palette.common.white,
    padding: theme.spacing(3),
    textAlign: 'center',
    width: '100%',
    maxWidth: 300,
    margin: 'auto',
    transition: 'transform 0.3s ease-in-out', // Smooth transition for hover
    '&:hover': {
        transform: 'scale(1.05)', // Zoom effect on hover
    },
}));

const InternInfo = () => {
    const [interns, setInterns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${config.baseApiUrl}/api/supervisors/interns`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setInterns(response.data);
            } catch (err) {
                console.error('Error fetching interns:', err);
                setError('Failed to fetch interns information.');
            }
        };

        fetchInterns();
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

    if (!interns || interns.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h6" color="textSecondary">
                    No interns assigned yet.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3"
                component="h2"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: 4,
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
            >
                Your Interns
            </Typography>
            <Grid container spacing={4}>
                {interns.map((intern) => (
                    <Grid item xs={12} sm={6} md={4} key={intern.id}>
                        <GradientCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <PersonIcon sx={{ fontSize: 60 }} />
                                </Box>
                                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                                    {intern.firstName && intern.lastName
                                        ? `${intern.firstName} ${intern.lastName}`
                                        : intern.userName || 'N/A'}
                                </Typography>
                                <Typography variant="body1">{intern.email}</Typography>
                            </CardContent>
                        </GradientCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InternInfo;
*/


import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';

// Styled Card with gradient background and hover effect
const GradientCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[6],
    background: 'linear-gradient(45deg, #1976d2, #9c27b0)', // Blue to purple gradient
    color: theme.palette.common.white,
    padding: theme.spacing(3),
    textAlign: 'center',
    width: '100%',
    maxWidth: 300,
    margin: 'auto',
    transition: 'transform 0.3s ease-in-out', // Smooth transition for hover
    '&:hover': {
        transform: 'scale(1.05)', // Zoom effect on hover
    },
}));

const InternInfo = () => {
    const { t } = useTranslation();
    const [interns, setInterns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${config.baseApiUrl}/api/supervisors/interns`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setInterns(response.data);
            } catch (err) {
                console.error('Error fetching interns:', err);
                setError(t('error_fetching_interns'));
            }
        };

        fetchInterns();
    }, [t]);

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!interns || interns.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h6" color="textSecondary">
                    {t('no_interns_assigned')}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3"
                component="h2"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: 4,
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
            >
                {t('your_interns')}
            </Typography>
            <Grid container spacing={4}>
                {interns.map((intern) => (
                    <Grid item xs={12} sm={6} md={4} key={intern.id}>
                        <GradientCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <PersonIcon sx={{ fontSize: 60 }} />
                                </Box>
                                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                                    {intern.firstName && intern.lastName
                                        ? `${intern.firstName} ${intern.lastName}`
                                        : intern.userName || 'N/A'}
                                </Typography>
                                <Typography variant="body1">{intern.email}</Typography>
                            </CardContent>
                        </GradientCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InternInfo;
