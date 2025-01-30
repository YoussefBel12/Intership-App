/*
import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';

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
        <div className="container mt-5">
            <div className="card mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Register</h2>
                    {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}
                    {submitSuccess && <div className="alert alert-success" role="alert">Registration successful!</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="register-email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="register-email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="register-password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="register-firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="register-lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Registration;
*/

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
