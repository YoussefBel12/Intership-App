/*

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


*/

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    ThemeProvider,
    createTheme
} from "@mui/material";
import { styled } from "@mui/material/styles";
import config from "../config";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import { useTranslation } from "react-i18next";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2"
        },
        secondary: {
            main: "#9c27b0"
        }
    }
});

const DashboardContainer = styled(Container)(({ theme }) => ({
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: theme.palette.background.default
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    marginTop: "20px"
}));

const DashboardAdmin = () => {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: config.baseApiUrl,
            headers: {
                Authorization: token ? `Bearer ${token}` : ""
            }
        });

        const fetchData = async () => {
            try {
                const [internResponse, supervisorResponse, userResponse] = await Promise.all([
                    axiosInstance.get("/api/ShowInternNumber/intern-count"),
                    axiosInstance.get("/api/ShowSupervisorNumber/supervisor-count"),
                    axiosInstance.get("/api/ShowUserNumber/user-count")
                ]);

                setData({
                    internCount: internResponse.data.internCount,
                    supervisorCount: supervisorResponse.data.supervisorCount,
                    userCount: userResponse.data.userCount
                });
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(t("error_fetching_data", { error: err.message }));
            }
        };

        fetchData();
    }, [token, t]);

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
        { name: t("interns"), count: internCount || 0 },
        { name: t("supervisors"), count: supervisorCount || 0 },
        { name: t("users"), count: userCount || 0 }
    ];

    return (
        <ThemeProvider theme={theme}>
            <DashboardContainer maxWidth="lg">
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: "bold", mb: 4 }}
                >
                    {t("admin_dashboard")}
                </Typography>
                <ChartWrapper>
                    <Typography
                        variant="h6"
                        sx={{ color: "text.secondary", mb: 2, textAlign: "center" }}
                    >
                        {t("user_summary")}
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




