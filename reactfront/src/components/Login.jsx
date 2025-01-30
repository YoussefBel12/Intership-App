/*
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Login = ({ handleLogin, error, setError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // Add this line

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
         handleLogin(username, password, rememberMe); // Pass rememberMe to handleLogin

        
    };

    return (
        <div className="container mt-5"> 
            <div className="card mx-auto" style={{ maxWidth: '400px' }}> 
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Login</h2>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>} 
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="login-username" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="login-username"
                                name="username"
                                placeholder="Enter your email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="login-password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="login-password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>


                        
                        <div className="mb-3 form-check"> 
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                        </div>



                        <div className="d-grid"> 
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>

                   
                    <div className="text-center mt-3">
                        <Link to="/register" className="btn btn-link">Dont have an account? Register</Link>
                    </div>
                      
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
};

export default Login;
*/


import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Button, Typography, Container, Card, CardContent, Alert, } from '@mui/material';

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

const Login = ({ handleLogin, error, setError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        handleLogin(username, password, rememberMe);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card variant="outlined" sx={StyledCard}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1976d2' }}>
                        Login
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                            }
                            label="Remember Me"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, background: '#1976d2', '&:hover': { background: '#9c27b0' } }}>
                            Login
                        </Button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button variant="text" color="primary">
                                Dont have an account? Register
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
};

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
};

export default Login;
