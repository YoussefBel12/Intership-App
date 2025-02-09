/*
import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Card, CardContent, Alert, } from '@mui/material';

// Adding a purple border effect around the card
const StyledCard = {
    border: '2px solid #9c27b0', // Purple border
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for a modern look
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)', // Slight scaling on hover
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
    }
};

const Registration = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            const response = await axios.post(`${config.baseApiUrl}/api/Auth/register`, formData);
            if (response.status === 200) {
                setSubmitSuccess(true);
                setFormData({ email: '', password: '', firstName: '', lastName: '' });
            }
        } catch (error) {
            console.error('Registration API Error:', error);
            let errorMessage = '';
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    errorMessage = Object.keys(error.response.data.errors)
                        .map(key => error.response.data.errors[key].join('\n'))
                        .join('\n');
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = 'Server responded with an error.';
                }
            } else if (error.request) {
                errorMessage = 'No response received from the server.';
            } else {
                errorMessage = 'Error setting up the request.';
            }
            setSubmitError(errorMessage);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card variant="outlined" sx={StyledCard}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1976d2' }}>
                        Register
                    </Typography>
                    {submitError && <Alert severity="error">{submitError}</Alert>}
                    {submitSuccess && <Alert severity="success">Registration successful!</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, background: '#1976d2', '&:hover': { background: '#9c27b0' } }}>
                            Register
                        </Button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="text" color="primary">
                                Already have an account? Login
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Registration;
*/



import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Card, CardContent, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next'; // <-- Import here

const StyledCard = {
    border: '2px solid #9c27b0',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
    }
};

const Registration = () => {
    const { t } = useTranslation(); // <-- Use the translation hook here
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            const response = await axios.post(`${config.baseApiUrl}/api/Auth/register`, formData);
            if (response.status === 200) {
                setSubmitSuccess(true);
                setFormData({ email: '', password: '', firstName: '', lastName: '' });
            }
        } catch (error) {
            let errorMessage = '';
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    errorMessage = Object.keys(error.response.data.errors)
                        .map(key => error.response.data.errors[key].join('\n'))
                        .join('\n');
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = 'Server responded with an error.';
                }
            } else if (error.request) {
                errorMessage = 'No response received from the server.';
            } else {
                errorMessage = 'Error setting up the request.';
            }
            setSubmitError(errorMessage);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card variant="outlined" sx={StyledCard}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1976d2' }}>
                        {t('register')}
                    </Typography>
                    {submitError && <Alert severity="error">{submitError}</Alert>}
                    {submitSuccess && <Alert severity="success">{t('registration_successful')}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label={t('email_address')}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label={t('password')}
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label={t('first_name')}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label={t('last_name')}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, background: '#1976d2', '&:hover': { background: '#9c27b0' } }}>
                            {t('register')}
                        </Button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="text" color="primary">
                                {t('already_have_account')}
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Registration;
