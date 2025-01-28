/*
import { useState } from 'react';
//import PropTypes from 'prop-types';
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
        cvFilePath: '',
        recruitmentSessionId: 1,
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
                    'Content-Type': `multipart/form-data; boundary=${formDataToSend._boundary}`,
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
                cvFilePath: '',
                recruitmentSessionId: 1,
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
        <div>
            <h2>Submit Your Candidature</h2>
            {submitError && <div>{submitError}</div>}
            {submitSuccess && <div>Candidature submitted successfully!</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="school">School</label>
                    <input type="text" id="school" name="school" placeholder="School" value={formData.school} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="level">Level</label>
                    <input type="text" id="level" name="level" placeholder="Level" value={formData.level} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="cvFile">CV File</label>
                    <input type="file" id="cvFile" name="cvFile" onChange={handleFileChange} />
                </div>
                <div>
                    <label htmlFor="cvFilePath">Custom CV File Path (Optional)</label>
                    <input type="text" id="cvFilePath" name="cvFilePath" placeholder="Custom CV File Path" value={formData.cvFilePath} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

CandidateForm.propTypes = {

};

export default CandidateForm; */

//everything up same as this but without bootstrap


import  { useState } from 'react';
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
                            <input type="text" id="level" name="level" placeholder="Level" value={formData.level} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cvFile" className="form-label">CV File</label>
                            <input type="file" id="cvFile" name="cvFile" onChange={handleFileChange} className="form-control" />
                        </div>
                        {/*     <div className="mb-3">
                            <label htmlFor="cvFilePath" className="form-label">Custom CV File Path (Optional)</label>
                            <input type="text" id="cvFilePath" name="cvFilePath" placeholder="Custom CV File Path" value={formData.cvFilePath} onChange={handleChange} className="form-control" />
                        </div>  */}
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