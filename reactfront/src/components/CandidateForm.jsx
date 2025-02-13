/*

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
*/


import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { TextField, Button, Typography, Container, Card, CardContent, Alert, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

const CandidateForm = () => {
    const { t } = useTranslation();

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
            setSubmitError(t("please_select_a_cv_file_or_enter_a_custom_path"));
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
                    setSubmitError(t("server_responded_with_an_error"));
                }
            } else if (error.request) {
                console.error("Error Request:", error.request);
                setSubmitError(t("no_response_received_from_the_server"));
            } else {
                console.error('Error Message:', error.message);
                setSubmitError(t("error_setting_up_the_request"));
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card variant="outlined" sx={StyledCard}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1976d2' }}>
                        {t("submit_your_candidature")}
                    </Typography>
                    {submitError && <Alert severity="error">{submitError}</Alert>}
                    {submitSuccess && <Alert severity="success">{t("candidature_submitted_successfully")}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label={t("first_name")}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label={t("last_name")}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label={t("email")}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label={t("school")}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label={t("level")}
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
                            {t("submit")}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CandidateForm;
