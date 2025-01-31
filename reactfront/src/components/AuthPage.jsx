

import PropTypes from 'prop-types';
import Login from './Login';
import { Typography } from '@mui/material';

// Custom style for the "Please sign in" heading
const HeadingStyle = {
    fontSize: '2.5rem', // Larger font size
    fontWeight: 'bold', // Bold text
    color: '#ffffff', // White text for better contrast
    textAlign: 'center', // Center alignment
    marginBottom: '24px', // Spacing below the heading
    textTransform: 'uppercase', // Uppercase text
    letterSpacing: '1.5px', // Slightly spaced letters
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for better readability
    padding: '16px 0', // Add some padding for better spacing
    background: 'linear-gradient(45deg, #1976d2, #9c27b0)', // Blue-to-purple gradient
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
};

const AuthPage = ({ handleLogin, error, setError }) => (
    <div style={{ textAlign: 'center', padding: '24px', background: 'url("your-background-image.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
        {/* Updated "Please sign in" heading */}
        <Typography variant="h1" sx={HeadingStyle}>
            Please sign in
        </Typography>
        <Login handleLogin={handleLogin} error={error} setError={setError} />
    </div>
);

AuthPage.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
};

export default AuthPage;