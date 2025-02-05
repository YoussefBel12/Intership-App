/* this one is the old theme
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, CircularProgress, Box, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import config from '../config';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
//import EventIcon from '@mui/icons-material/Event';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

const DashboardContainer = styled(Container)(({ theme }) => ({
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: theme.palette.background.default,
}));

const SummaryItem = styled(Paper)(({ theme }) => ({
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
    },
}));

const IconBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: '#fff',
    marginBottom: '10px',
}));

const DashboardAdmin = () => {
    const [data, setData] = useState(null);  // Use 'data' state as before
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: config.baseApiUrl,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        const fetchData = async () => {
            try {
                const [internResponse, supervisorResponse, userResponse] = await Promise.all([
                    axiosInstance.get("/api/ShowInternNumber/intern-count"),
                    axiosInstance.get("/api/ShowSupervisorNumber/supervisor-count"),
                    axiosInstance.get("/api/ShowUserNumber/user-count"),
                ]);

                setData({
                    internCount: internResponse.data.internCount,
                    supervisorCount: supervisorResponse.data.supervisorCount,
                    userCount: userResponse.data.userCount,
                });

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(`Failed to fetch data: ${err.message}`);
            }
        };

        fetchData();
    }, [token]);

    if (data === null) {
        return <CircularProgress />; // Use CircularProgress for loading
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    const { internCount, supervisorCount, userCount } = data;

    return (
        <ThemeProvider theme={theme}>
            <DashboardContainer maxWidth="lg">
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
                   Admin Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PeopleIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Total Interns
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {internCount || 0}  
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PersonIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Total Supervisors 
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {supervisorCount || 0} 
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PeopleIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Total Users 
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {userCount || 0} 
                            </Typography>
                        </SummaryItem>
                    </Grid>
                </Grid>
            </DashboardContainer>
        </ThemeProvider>
    );
};
export default DashboardAdmin;

*/



import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    ThemeProvider,
    createTheme
} from '@mui/material';
// Import styled from @mui/material/styles rather than @mui/system
import { styled } from '@mui/material/styles';
import config from '../config';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        },
        secondary: {
            main: '#9c27b0'
        }
    }
});

const DashboardContainer = styled(Container)(({ theme }) => ({
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: theme.palette.background.default
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    marginTop: '20px'
}));

const DashboardAdmin = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: config.baseApiUrl,
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        });

        const fetchData = async () => {
            try {
                const [internResponse, supervisorResponse, userResponse] = await Promise.all([
                    axiosInstance.get('/api/ShowInternNumber/intern-count'),
                    axiosInstance.get('/api/ShowSupervisorNumber/supervisor-count'),
                    axiosInstance.get('/api/ShowUserNumber/user-count')
                ]);

                setData({
                    internCount: internResponse.data.internCount,
                    supervisorCount: supervisorResponse.data.supervisorCount,
                    userCount: userResponse.data.userCount
                });
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(`Failed to fetch data: ${err.message}`);
            }
        };

        fetchData();
    }, [token]);

    if (error) {
        return (
            <DashboardContainer maxWidth="lg">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </DashboardContainer>
        );
    }

    if (data === null) {
        return (
            <DashboardContainer maxWidth="lg">
                <CircularProgress />
            </DashboardContainer>
        );
    }

    const { internCount, supervisorCount, userCount } = data;

    // Prepare chart data
    const chartData = [
        { name: 'Interns', count: internCount || 0 },
        { name: 'Supervisors', count: supervisorCount || 0 },
        { name: 'Users', count: userCount || 0 }
    ];

    return (
        <ThemeProvider theme={theme}>
            <DashboardContainer maxWidth="lg">
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}
                >
                    Admin Dashboard
                </Typography>
                <ChartWrapper>
                    <Typography
                        variant="h6"
                        sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}
                    >
                        User Summary
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="count"
                                fill={theme.palette.primary.main}
                                barSize={60}
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartWrapper>
            </DashboardContainer>
        </ThemeProvider>
    );
};

export default DashboardAdmin;




/*this one is set as a button if u have guidline problem

import  { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    ThemeProvider,
    createTheme,
    Drawer,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import config from '../config'; // adjust the path as needed

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

// Styled container for the dashboard content
const DashboardContainer = styled(Container)(({ theme }) => ({
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: theme.palette.background.default,
}));

// Styled box to wrap the chart
const ChartWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    marginTop: '20px',
}));

// DashboardAdmin: fetches data and renders a Recharts bar chart.
const DashboardAdmin = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: config.baseApiUrl,
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        const fetchData = async () => {
            try {
                const [internResponse, supervisorResponse, userResponse] = await Promise.all([
                    axiosInstance.get('/api/ShowInternNumber/intern-count'),
                    axiosInstance.get('/api/ShowSupervisorNumber/supervisor-count'),
                    axiosInstance.get('/api/ShowUserNumber/user-count'),
                ]);

                setData({
                    internCount: internResponse.data.internCount,
                    supervisorCount: supervisorResponse.data.supervisorCount,
                    userCount: userResponse.data.userCount,
                });
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(`Failed to fetch data: ${err.message}`);
            }
        };

        fetchData();
    }, [token]);

    if (error) {
        return (
            <DashboardContainer maxWidth="lg">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </DashboardContainer>
        );
    }

    if (data === null) {
        return (
            <DashboardContainer maxWidth="lg">
                <CircularProgress />
            </DashboardContainer>
        );
    }

    const { internCount, supervisorCount, userCount } = data;

    // Prepare the data for the bar chart
    const chartData = [
        { name: 'Interns', count: internCount || 0 },
        { name: 'Supervisors', count: supervisorCount || 0 },
        { name: 'Users', count: userCount || 0 },
    ];

    return (
        <DashboardContainer maxWidth="lg">
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}
            >
                Admin Dashboard
            </Typography>
            <ChartWrapper>
                <Typography
                    variant="h6"
                    sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}
                >
                    User Summary
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="count"
                            fill={theme.palette.primary.main}
                            barSize={60}
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartWrapper>
        </DashboardContainer>
    );
};

// DashboardWithDrawer: wraps DashboardAdmin in a Drawer and manages focus.
const DashboardWithDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    // Ref for the button that opens the drawer
    const openButtonRef = useRef(null);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        // When the drawer closes, return focus to the trigger button
        if (openButtonRef.current) {
            openButtonRef.current.focus();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ p: 2 }}>
                <Button ref={openButtonRef} variant="contained" onClick={handleDrawerOpen}>
                    Open Dashboard
                </Button>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Keeps the dashboard mounted even when the drawer is closed.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            // Adjust the width based on screen size:
                            width: { xs: '100%', sm: '80%', md: '60%' },
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    
                    <Box sx={{ p: 2 }}>
                        <Button variant="outlined" onClick={handleDrawerClose} sx={{ mb: 2 }}>
                            Close
                        </Button>
                        <DashboardAdmin />
                    </Box>
                </Drawer>
            </Box>
        </ThemeProvider>
    );
};

export default DashboardWithDrawer;
*/