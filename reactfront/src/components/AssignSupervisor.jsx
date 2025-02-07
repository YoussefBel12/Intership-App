
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, Card, CardContent, Snackbar, Alert } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

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

const AssignSupervisor = () => {
    const [interns, setInterns] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [selectedIntern, setSelectedIntern] = useState('');
    const [selectedSupervisor, setSelectedSupervisor] = useState('');
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const response = await axios.get(`${config.baseApiUrl}/api/interns/list-interns`, axiosConfig);
                setInterns(response.data);
            } catch (error) {
                console.error('Error fetching interns:', error);
            }
        };

        const fetchSupervisors = async () => {
            try {
                const response = await axios.get(`${config.baseApiUrl}/api/interns/list-supervisors`, axiosConfig);
                setSupervisors(response.data);
            } catch (error) {
                console.error('Error fetching supervisors:', error);
            }
        };

        fetchInterns();
        fetchSupervisors();
    }, []);

    const handleAssign = async () => {
        if (!selectedIntern || !selectedSupervisor) {
            setMessage('Please select both an intern and a supervisor.');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await axios.put(
                `${config.baseApiUrl}/api/usermanagement/assign-supervisor/${selectedIntern}`,
                { SupervisorId: selectedSupervisor },
                axiosConfig
            );
            setMessage(response.data.message);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error assigning supervisor:', error);
            setMessage('Failed to assign supervisor.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box sx={{ textAlign: 'center', padding: 2, background: 'linear-gradient(135deg, #1976d2 30%, #9c27b0 90%)', color: 'white', borderRadius: 1, marginBottom: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Assign Supervisor to Intern
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <Card sx={{ flex: 1, marginRight: 1, background: 'linear-gradient(135deg, #1976d2 30%, #9c27b0 90%)', color: 'white', padding: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <PersonIcon sx={{ fontSize: 60, marginRight: 2 }} />
                                <Typography variant="h5">Intern</Typography>
                            </Box>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }}>Intern</InputLabel>
                                <Select
                                    value={selectedIntern}
                                    onChange={(e) => setSelectedIntern(e.target.value)}
                                    label="Intern"
                                    sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                                >
                                    <MenuItem value="">Select Intern</MenuItem>
                                    {interns.map((intern) => (
                                        <MenuItem key={intern.id} value={intern.id}>
                                            {intern.firstName} {intern.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 1, marginLeft: 1, background: 'linear-gradient(135deg, #9c27b0 30%, #1976d2 90%)', color: 'white', padding: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <SupervisorAccountIcon sx={{ fontSize: 60, marginRight: 2 }} />
                                <Typography variant="h5">Supervisor</Typography>
                            </Box>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }}>Supervisor</InputLabel>
                                <Select
                                    value={selectedSupervisor}
                                    onChange={(e) => setSelectedSupervisor(e.target.value)}
                                    label="Supervisor"
                                    sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                                >
                                    <MenuItem value="">Select Supervisor</MenuItem>
                                    {supervisors.map((supervisor) => (
                                        <MenuItem key={supervisor.id} value={supervisor.id}>
                                            {supervisor.firstName} {supervisor.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>
                <Button variant="contained" color="primary" onClick={handleAssign}>
                    Assign Supervisor
                </Button>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default AssignSupervisor;
