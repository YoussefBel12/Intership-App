import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';
import config from './config'; // Import the config file
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

const DashboardContainer = styled(Container)({
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
});

const SummaryItem = styled(Paper)({
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
});

const IconBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#1976d2',
    color: '#fff',
    marginBottom: '10px',
});

const Dashboard = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get(`${config.baseApiUrl}/api/Summary`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT token in localStorage
                    }
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
        <DashboardContainer maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <SummaryItem>
                        <IconBox>
                            <PeopleIcon fontSize="large" />
                        </IconBox>
                        <Typography variant="h6">Total Interns</Typography>
                        <Typography variant="h4">{summary.totalInterns}</Typography>
                    </SummaryItem>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <SummaryItem>
                        <IconBox>
                            <PersonIcon fontSize="large" />
                        </IconBox>
                        <Typography variant="h6">Total Candidates</Typography>
                        <Typography variant="h4">{summary.totalCandidates}</Typography>
                    </SummaryItem>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <SummaryItem>
                        <IconBox>
                            <EventIcon fontSize="large" />
                        </IconBox>
                        <Typography variant="h6">Total Recruitment Sessions</Typography>
                        <Typography variant="h4">{summary.totalRecruitmentSessions}</Typography>
                    </SummaryItem>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default Dashboard;
