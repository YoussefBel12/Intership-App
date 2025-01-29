import  { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom'; // Import Link here!
const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (formData.newPassword !== formData.confirmNewPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.put(`${config.baseApiUrl}/api/Auth/change-password`, formData, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (response.status === 200) {
                setMessage(response.data.message);
                setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
            } else {
                setError("Failed to change password.");
            }
        } catch (error) {
            console.error("Change Password API Error:", error);
            setError(getErrorMessage(error));
        }
    };

    const getErrorMessage = (error) => {
        if (error.response) {
            if (error.response.data && error.response.data.errors) {
                let errorMessage = "";
                for (const key in error.response.data.errors) {
                    errorMessage += error.response.data.errors[key].join("\n") + "\n";
                }
                return errorMessage;
            } else if (error.response.data && error.response.data.message) {
                return error.response.data.message;
            } else {
                return "Server responded with an error.";
            }
        } else if (error.request) {
            return "No response received from the server.";
        } else {
            return "Error setting up the request.";
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Change Password</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary me-3">Change Password</button>
                    <Link to="/home" className="btn btn-secondary">Back to Home</Link>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;