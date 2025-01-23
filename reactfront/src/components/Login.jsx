/*
import { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ handleLogin, error, setError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }
        handleLogin(username, password);
    };

    return (
        <div className="login-form">  
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}  
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-username">Email address</label>
                    <input
                        type="email"
                        id="login-username"
                        name="username"  
                        placeholder="Enter your email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"  
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};


   
  

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
};

export default Login;  */

//everything up same as this but without bootstrap
import  { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ handleLogin, error, setError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        handleLogin(username, password);
    };

    return (
        <div className="container mt-5"> {/* Added container and margin for spacing */}
            <div className="card mx-auto" style={{ maxWidth: '400px' }}> {/* Card for login form */}
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Login</h2>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Error message using Bootstrap alert */}
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
                        <div className="d-grid"> {/* Full width button */}
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
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