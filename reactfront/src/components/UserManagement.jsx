/*
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from "@mui/material";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const checkUserRole = async () => {
        try {
            const response = await axios.get(`${config.baseApiUrl}/api/UserManagement/role`, { headers });
            const { role } = response.data;
            if (role !== "admin") {
                alert("Access denied. Only admins can view this page.");
                navigate("/");
            }
        } catch {
            alert("Failed to verify role. Please log in again.");
            navigate("/login");
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.baseApiUrl}/api/UserManagement/list`, { headers });
            setUsers(response.data);
        } catch {
            setError("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const endpoint = selectedUser
            ? `${config.baseApiUrl}/api/UserManagement/modify/${selectedUser.id}`
            : `${config.baseApiUrl}/api/UserManagement/add`;

        const method = selectedUser ? "put" : "post";

        try {
            await axios[method](endpoint, form, { headers });
            fetchUsers();
            resetForm();
        } catch {
            setError("Failed to save user. Please try again.");
        }
    };

    const handleViewUser = async (userId) => {
        try {
            const response = await axios.get(`${config.baseApiUrl}/api/UserManagement/view/${userId}`, { headers });
            alert(JSON.stringify(response.data, null, 2));
        } catch {
            setError("Failed to fetch user details. Please try again.");
        }
    };

    const resetForm = () => {
        setForm({ firstName: "", lastName: "", email: "", password: "", role: "" });
        setSelectedUser(null);
    };

    useEffect(() => {
        checkUserRole();
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleModifyClick = (user) => {
        setSelectedUser(user);
        setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.roles[0] || "",
            password: "", // Hide password when modifying
        });
    };

    return (
        <Container maxWidth="md" style={{ marginTop: 40, marginBottom: 40 }}>
            <Typography variant="h3" align="center" color="primary" gutterBottom>
                User Management
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleFormSubmit} style={{ padding: 20, boxShadow: 3, borderRadius: 10, backgroundColor: "#f5f5f5" }}>
                <Typography variant="h5" color="secondary" gutterBottom>
                    {selectedUser ? "Modify User" : "Add User"}
                </Typography>

                <TextField
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ marginBottom: 16 }}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ marginBottom: 16 }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ marginBottom: 16 }}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    required={!selectedUser}
                    style={{ marginBottom: 16 }}
                />
                <TextField
                    label="Role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginBottom: 16 }}
                />

                <div>
                    <Button variant="contained" color="success" type="submit" style={{ marginRight: 8 }}>
                        {selectedUser ? "Save Changes" : "Add User"}
                    </Button>
                    {selectedUser && (
                        <Button variant="outlined" color="warning" onClick={resetForm}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>

            <Link to="/home">
                <Button variant="outlined" style={{ marginTop: 24 }}>
                    Back to Home
                </Button>
            </Link>

            <Typography variant="h5" color="secondary" style={{ marginTop: 40 }}>
                User List
            </Typography>
            {loading ? (
                <CircularProgress style={{ display: "block", margin: "auto" }} />
            ) : (
                <TableContainer component={Paper} style={{ marginTop: 24 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Roles</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.roles.join(", ")}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            size="small"
                                            onClick={() => handleViewUser(user.id)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleModifyClick(user)}
                                            style={{ marginLeft: 8 }}
                                        >
                                            Modify
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default UserManagement;
*/



// Same as the old one just added ways to give a supervisor to inter

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [supervisors, setSupervisors] = useState([]); // 🆕 Holds supervisor list
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        supervisorId: "", // 🆕 Holds the selected supervisor
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const checkUserRole = async () => {
        try {
            const response = await axios.get(`${config.baseApiUrl}/api/UserManagement/role`, { headers });
            const { role } = response.data;
            if (role !== "admin") {
                alert("Access denied. Only admins can view this page.");
                navigate("/");
            }
        } catch {
            alert("Failed to verify role. Please log in again.");
            navigate("/login");
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.baseApiUrl}/api/UserManagement/list`, { headers });
            setUsers(response.data);
        } catch {
            setError("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 🆕 Fetch supervisors
    const fetchSupervisors = async () => {
        try {
            const response = await axios.get(`${config.baseApiUrl}/api/UserManagement/list`, { headers });
            const supervisorsList = response.data.filter(user => user.roles.includes("supervisor"));
            setSupervisors(supervisorsList);
        } catch {
            setError("Failed to fetch supervisors.");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const endpoint = selectedUser
            ? `${config.baseApiUrl}/api/UserManagement/modify/${selectedUser.id}`
            : `${config.baseApiUrl}/api/UserManagement/add`;

        const method = selectedUser ? "put" : "post";

        try {
            await axios[method](endpoint, form, { headers });
            fetchUsers();
            resetForm();

            // 🆕 If modifying an intern and a supervisor is selected, assign the supervisor
            if (selectedUser?.roles.includes("intern") && form.supervisorId) {
                await axios.put(`${config.baseApiUrl}/api/UserManagement/assign-supervisor/${selectedUser.id}`, {
                    supervisorId: form.supervisorId,
                }, { headers });

                fetchUsers(); // Refresh user list after assigning supervisor
            }
        } catch {
            setError("Failed to save user. Please try again.");
        }
    };

    const handleViewUser = async (userId) => {
        try {
            const response = await axios.get(`${config.baseApiUrl}/api/UserManagement/view/${userId}`, { headers });
            alert(JSON.stringify(response.data, null, 2));
        } catch {
            setError("Failed to fetch user details. Please try again.");
        }
    };

    const resetForm = () => {
        setForm({ firstName: "", lastName: "", email: "", password: "", role: "", supervisorId: "" });
        setSelectedUser(null);
    };

    useEffect(() => {
        checkUserRole();
        fetchUsers();
        fetchSupervisors(); // 🆕 Fetch supervisors on mount
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleModifyClick = (user) => {
        setSelectedUser(user);
        setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.roles[0] || "",
            password: "",
            supervisorId: "", // Reset supervisor selection
        });
    };

    return (
        <Container maxWidth="md" style={{ marginTop: 40, marginBottom: 40 }}>
            <Typography variant="h3" align="center" color="primary" gutterBottom>
                User Management
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleFormSubmit} style={{ padding: 20, boxShadow: 3, borderRadius: 10, backgroundColor: "#f5f5f5" }}>
                <Typography variant="h5" color="secondary" gutterBottom>
                    {selectedUser ? "Modify User" : "Add User"}
                </Typography>

                <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} fullWidth required style={{ marginBottom: 16 }} />
                <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} fullWidth required style={{ marginBottom: 16 }} />
                <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} fullWidth required style={{ marginBottom: 16 }} />
                <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required={!selectedUser} style={{ marginBottom: 16 }} />
                <TextField label="Role" name="role" value={form.role} onChange={handleChange} fullWidth style={{ marginBottom: 16 }} />

                {/* 🆕 Supervisor Dropdown (Only shown if modifying an intern) */}
                {selectedUser?.roles.includes("intern") && (
                    <FormControl fullWidth style={{ marginBottom: 16 }}>
                        <InputLabel>Select Supervisor</InputLabel>
                        <Select name="supervisorId" value={form.supervisorId} onChange={handleChange}>
                            <MenuItem value="">None</MenuItem>
                            {supervisors.map((sup) => (
                                <MenuItem key={sup.id} value={sup.id}>{sup.firstName} {sup.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <div>
                    <Button variant="contained" color="success" type="submit" style={{ marginRight: 8 }}>
                        {selectedUser ? "Save Changes" : "Add User"}
                    </Button>
                    {selectedUser && (
                        <Button variant="outlined" color="warning" onClick={resetForm}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>

            <Link to="/home">
                <Button variant="outlined" style={{ marginTop: 24 }}>Back to Home</Button>
            </Link>

            <Typography variant="h5" color="secondary" style={{ marginTop: 40 }}>
                User List
            </Typography>
            {loading ? (
                <CircularProgress style={{ display: "block", margin: "auto" }} />
            ) : (
                <TableContainer component={Paper} style={{ marginTop: 24 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Roles</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.roles.join(", ")}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="info" size="small" onClick={() => handleViewUser(user.id)}>View</Button>
                                        <Button variant="contained" color="primary" size="small" onClick={() => handleModifyClick(user)} style={{ marginLeft: 8 }}>Modify</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default UserManagement;
