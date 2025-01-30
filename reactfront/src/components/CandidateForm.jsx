/*
import { useState } from 'react';
import axios from 'axios';
import config from '../config';

const CandidateForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        school: '',
        level: '',
        cvFile: null,
        cvFilePath: 'huh',
        recruitmentSessionId: 4,
      
    });
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, cvFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        if (!formData.cvFile && !formData.cvFilePath) {
            setSubmitError("Please select a CV file or enter a custom path.");
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key] === null ? "" : formData[key]);
        }
        if (formData.cvFile) {
            formDataToSend.append('CvFile', formData.cvFile, formData.cvFile.name);
        }

        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.post(`${config.baseApiUrl}/api/candidates`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            console.log("Axios Response:", response);
            setSubmitSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                school: '',
                level: '',
                cvFile: null,
                cvFilePath: 'huh',
                recruitmentSessionId: 4,
            });
        } catch (error) {
            console.error("Full Error Object:", error);

            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);

                if (error.response.data && error.response.data.errors) {
                    let errorMessage = "";
                    for (const key in error.response.data.errors) {
                        errorMessage += error.response.data.errors[key].join("\n") + "\n";
                    }
                    setSubmitError(errorMessage);
                } else if (error.response.data && error.response.data.message) {
                    setSubmitError(error.response.data.message);
                } else {
                    setSubmitError("Server responded with an error.");
                }
            } else if (error.request) {
                console.error("Error Request:", error.request);
                setSubmitError("No response received from the server.");
            } else {
                console.error('Error Message:', error.message);
                setSubmitError("Error setting up the request.");
            }
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h2>Submit Your Candidature</h2>
                </div>
                <div className="card-body">
                    {submitError && <div className="alert alert-danger">{submitError}</div>}
                    {submitSuccess && <div className="alert alert-success">Candidature submitted successfully!</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="school" className="form-label">School</label>
                            <input type="text" id="school" name="school" placeholder="School" value={formData.school} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="level" className="form-label">Level</label>
                            <input type="text" id="level" name="level" placeholder="Bac+" value={formData.level} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cvFile" className="form-label">CV File</label>
                            <input type="file" id="cvFile" name="cvFile" onChange={handleFileChange} className="form-control" />
                        </div>
                        
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CandidateForm;
*/


import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { TextField, Button, Typography, Container, Card, CardContent, Alert, Box } from '@mui/material';

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

const CandidateForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        school: '',
        level: '',
        cvFile: null,
        cvFilePath: 'huh',
        recruitmentSessionId: 4,
    });
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, cvFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        if (!formData.cvFile && !formData.cvFilePath) {
            setSubmitError("Please select a CV file or enter a custom path.");
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key] === null ? "" : formData[key]);
        }
        if (formData.cvFile) {
            formDataToSend.append('CvFile', formData.cvFile, formData.cvFile.name);
        }

        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.post(`${config.baseApiUrl}/api/candidates`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            console.log("Axios Response:", response);
            setSubmitSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                school: '',
                level: '',
                cvFile: null,
                cvFilePath: 'huh',
                recruitmentSessionId: 4,
            });
        } catch (error) {
            console.error("Full Error Object:", error);

            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);

                if (error.response.data && error.response.data.errors) {
                    let errorMessage = "";
                    for (const key in error.response.data.errors) {
                        errorMessage += error.response.data.errors[key].join("\n") + "\n";
                    }
                    setSubmitError(errorMessage);
                } else if (error.response.data && error.response.data.message) {
                    setSubmitError(error.response.data.message);
                } else {
                    setSubmitError("Server responded with an error.");
                }
            } else if (error.request) {
                console.error("Error Request:", error.request);
                setSubmitError("No response received from the server.");
            } else {
                console.error('Error Message:', error.message);
                setSubmitError("Error setting up the request.");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card variant="outlined" sx={StyledCard}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1976d2' }}>
                        Submit Your Candidature
                    </Typography>
                    {submitError && <Alert severity="error">{submitError}</Alert>}
                    {submitSuccess && <Alert severity="success">Candidature submitted successfully!</Alert>}
                    <form onSubmit={handleSubmit}>
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
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="School"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Level"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            required
                        />
                        <Box marginBottom={2}>
                            <input
                                type="file"
                                id="cvFile"
                                name="cvFile"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </Box>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, background: '#1976d2', '&:hover': { background: '#9c27b0' } }}>
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CandidateForm;
