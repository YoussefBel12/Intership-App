/*
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const DashboardAdmin = () => {
    const [data, setData] = useState(null);
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

                console.log("Intern Response:", internResponse.data);
                console.log("Supervisor Response:", supervisorResponse.data);
                console.log("User Response:", userResponse.data);


                setData({
                    internCount: internResponse.data.internCount, // Accessing with correct name
                    supervisorCount: supervisorResponse.data.supervisorCount, // Accessing with correct name
                    userCount: userResponse.data.userCount, // Accessing with correct name
                });

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(`Failed to fetch data: ${err.message}`);
            }
        };

        fetchData();
    }, [token]);

    if (data === null) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    const { internCount, supervisorCount, userCount } = data;

    console.log("Data State:", data); // Check the data state after it's set

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Statistics</h2>
                <p><strong>Intern Count:</strong> {internCount || 0}</p>
                <p><strong>Supervisor Count:</strong> {supervisorCount || 0}</p>
                <p><strong>User Count:</strong> {userCount || 0}</p>
            </div>
            
        </div>
    );
};

export default DashboardAdmin;
*/




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
                                {internCount || 0}  {/* Display internCount */}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PersonIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Total Supervisors {/* Changed label */}
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {supervisorCount || 0} {/* Display supervisorCount */}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PeopleIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Total Users {/* Changed label */}
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {userCount || 0} {/* Display userCount */}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                </Grid>
            </DashboardContainer>
        </ThemeProvider>
    );
};
export default DashboardAdmin;