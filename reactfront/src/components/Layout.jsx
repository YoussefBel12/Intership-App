/*
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <nav className="navbar navbar-expand-lg shadow-sm">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <i className="bi bi-briefcase-fill me-2"></i>Internship & Candidate Web App
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/home">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1 container mt-5">
                {children}
            </main>

            <footer className="text-center py-3 mt-auto">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-md-start">
                            <p>&copy; {new Date().getFullYear()} Algo Consulting Group</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p>All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
*/

import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Container, Box, Button, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';

const Layout = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #1976d2, #9c27b0)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i className="bi bi-briefcase-fill me-2"></i>
                            Internship & Candidate Web App
                        </Link>
                    </Typography>
                    <IconButton color="inherit" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 2 }}>
                        <Button color="inherit" component={Link} to="/home">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar (Drawer for mobile screens) */}
            {drawerOpen && (
                <Box sx={{ position: 'absolute', top: '64px', left: 0, background: '#fff', width: '100%', zIndex: 1300 }}>
                    <Button onClick={handleDrawerToggle} sx={{ width: '100%', textAlign: 'left' }} component={Link} to="/home">Home</Button>
                    <Button onClick={handleDrawerToggle} sx={{ width: '100%', textAlign: 'left' }} component={Link} to="/login">Login</Button>
                    <Button onClick={handleDrawerToggle} sx={{ width: '100%', textAlign: 'left' }} component={Link} to="/register">Register</Button>
                </Box>
            )}

            {/* Main Content */}
            <main className="flex-grow-1 container mt-5">
                {children}
            </main>

            {/* Footer */}
            <footer style={{ background: 'linear-gradient(to right, #1976d2, #9c27b0)', padding: '20px 0' }}>
                <Container>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="body2" color="textSecondary" align="left">
                                &copy; {new Date().getFullYear()} Algo Consulting Group
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary" align="right">
                                All rights reserved.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;

