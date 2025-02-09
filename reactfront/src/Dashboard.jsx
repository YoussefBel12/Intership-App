/*
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, CircularProgress, Box, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import config from './config'; // Import the config file
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

// Create a custom theme with blue and purple colors
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue
        },
        secondary: {
            main: '#9c27b0', // Purple
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

const Dashboard = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get(`${config.baseApiUrl}/api/Summary`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setSummary(response.data);
            } catch (error) {
                console.error('Error fetching summary:', error);
            }
        };

        fetchSummary();
    }, []);

    if (!summary) {
        return <CircularProgress />;
    }

    return (
        <ThemeProvider theme={theme}>
            <DashboardContainer maxWidth="lg">
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
                    Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PeopleIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Needed Interns
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {summary.totalInterns}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PersonIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Total Candidates
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {summary.totalCandidates}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <EventIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                Total Recruitment Sessions
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {summary.totalRecruitmentSessions}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                </Grid>
            </DashboardContainer>
        </ThemeProvider>
    );
};

export default Dashboard;

*/

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, CircularProgress, Box, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import config from './config'; // Import the config file
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { useTranslation } from 'react-i18next';

// Create a custom theme with blue and purple colors
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue
        },
        secondary: {
            main: '#9c27b0', // Purple
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

const Dashboard = () => {
    const { t } = useTranslation();
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get(`${config.baseApiUrl}/api/Summary`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setSummary(response.data);
            } catch (error) {
                console.error('Error fetching summary:', error);
            }
        };

        fetchSummary();
    }, []);

    if (!summary) {
        return <CircularProgress />;
    }

    return (
        <ThemeProvider theme={theme}>
            <DashboardContainer maxWidth="lg">
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
                    {t('dashboard.title')} {/* Translated title */}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PeopleIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                {t('dashboard.neededInterns')} {/* Translated text */}
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {summary.totalInterns}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <PersonIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                {t('dashboard.totalCandidates')} {/* Translated text */}
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {summary.totalCandidates}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SummaryItem>
                            <IconBox>
                                <EventIcon fontSize="large" />
                            </IconBox>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                                {t('dashboard.totalRecruitmentSessions')} {/* Translated text */}
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {summary.totalRecruitmentSessions}
                            </Typography>
                        </SummaryItem>
                    </Grid>
                </Grid>
            </DashboardContainer>
        </ThemeProvider>
    );
};

export default Dashboard;
