/*
import { useState } from 'react';
import axios from 'axios';
import config from '../config';

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
            console.error("Registration API Error:", error);
            let errorMessage = "";
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    for (const key in error.response.data.errors) {
                        errorMessage += error.response.data.errors[key].join("\n") + "\n";
                    }
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = "Server responded with an error.";
                }
            } else if (error.request) {
                errorMessage = "No response received from the server.";
            } else {
                errorMessage = "Error setting up the request.";
            }
            setSubmitError(errorMessage);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {submitError && <div>{submitError}</div>}
            {submitSuccess && <div>Registration successful!</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="register-email">Email address</label>
                    <input
                        type="email"
                        id="register-email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="register-password">Password</label>
                    <input
                        type="password"
                        id="register-password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="register-firstName">First Name</label>
                    <input
                        type="text"
                        id="register-firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="register-lastName">Last Name</label>
                    <input
                        type="text"
                        id="register-lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;  */

//everything up same as this but without bootstrap
import  { useState } from 'react';
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
