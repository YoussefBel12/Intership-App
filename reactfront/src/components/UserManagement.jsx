import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

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
                    {!selectedUser && (
                        <div className="col-md-6">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>
                    )}
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
                                                password: "",
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
