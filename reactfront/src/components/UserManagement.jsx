/*
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Link } from 'react-router-dom'; // Import Link here!
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
    const [token] = useState(localStorage.getItem("token"));
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
            setLoading(false);
        } catch {
            setError("Failed to fetch users. Please try again.");
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
            const response = await axios.get(
                `${config.baseApiUrl}/api/UserManagement/view/${userId}`,
                { headers }
            );
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

    return (

     

        <div className="container my-5">
            <h1 className="text-center text-primary">User Management</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            

            <form className="p-4 shadow-lg rounded bg-light" onSubmit={handleFormSubmit}>
                <h2 className="text-secondary">{selectedUser ? "Modify User" : "Add User"}</h2>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
             
                    <div className="col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required={!selectedUser}  // Make it required only when adding a user
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Role"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <button className="btn btn-success me-2" type="submit">
                        {selectedUser ? "Save Changes" : "Add User"}
                    </button>
                    {selectedUser && (
                        <button className="btn btn-warning" onClick={resetForm} type="button">
                            Cancel
                        </button>
                    )}
                </div>
                
                <Link to="/home" className="btn btn-secondary">Back to Home</Link>


            </form>

            <h2 className="text-secondary mt-5">User List</h2>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p>Loading...</p>
                </div>
            ) : (
                <table className="table table-striped table-hover mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.join(", ")}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => handleViewUser(user.id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setForm({
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                email: user.email,
                                                role: user.roles[0] || "",
                                                password: "", // Do not show the password when modifying a user
                                            });
                                        }}
                                    >
                                        Modify
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserManagement;

*/

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
