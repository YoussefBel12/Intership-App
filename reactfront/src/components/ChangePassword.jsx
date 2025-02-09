/*
import { useState } from "react";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Alert, Box } from "@mui/material";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
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
            const storedToken = localStorage.getItem("token");
            const response = await axios.put(
                `${config.baseApiUrl}/api/Auth/change-password`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setMessage(response.data.message);
                setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
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
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                Change Password
            </Typography>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    boxShadow: 3,
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                }}
            >
                <TextField
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="contained" color="primary" type="submit" sx={{ flex: 1 }}>
                        Change Password
                    </Button>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <Button variant="outlined" color="secondary" sx={{ flex: 1 }}>
                            Back to Home
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default ChangePassword;
*/


import { useState } from "react";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Alert, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
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
            setError(t("passwords_do_not_match"));
            return;
        }

        try {
            const storedToken = localStorage.getItem("token");
            const response = await axios.put(
                `${config.baseApiUrl}/api/Auth/change-password`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setMessage(t("change_password_success"));
                setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
            } else {
                setError(t("change_password_error"));
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
                return t("server_responded_with_an_error");
            }
        } else if (error.request) {
            return t("no_response_received_from_the_server");
        } else {
            return t("error_setting_up_the_request");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                {t("change_password")}
            </Typography>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    boxShadow: 3,
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                }}
            >
                <TextField
                    label={t("current_password")}
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label={t("new_password")}
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label={t("confirm_new_password")}
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="contained" color="primary" type="submit" sx={{ flex: 1 }}>
                        {t("change_password")}
                    </Button>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <Button variant="outlined" color="secondary" sx={{ flex: 1 }}>
                            {t("back_to_home")}
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default ChangePassword;
