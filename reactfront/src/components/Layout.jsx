/*
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Container, Box, Grid, IconButton, Drawer, List, ListItem, ListItemButton, Avatar, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';

const Layout = ({ children, userData, handleLogout }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            
            <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #1976d2, #9c27b0)' }}>
                <Toolbar>
                  
                    <IconButton color="inherit" onClick={handleDrawerToggle} edge="start">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i className="bi bi-briefcase-fill me-2"></i>
                            Internship & Candidate Web App
                        </Link>
                    </Typography>

                    
                    {userData && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                                avatar={<Avatar>{userData.email[0].toUpperCase()}</Avatar>}
                                label={`${userData.email} (${userData.role})`}
                                variant="outlined"
                                sx={{ color: 'white', borderColor: 'white' }}
                            />
                            <IconButton color="inherit" onClick={handleLogout}>
                                <Typography variant="body2">Logout</Typography>
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <Box sx={{ width: 250, height: '100vh', background: 'linear-gradient(to right, #1976d2, #9c27b0)', color: 'white', paddingTop: 2 }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/home" sx={{ color: 'white' }}>Home</ListItemButton>
                        </ListItem>
                        {!userData && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/login" sx={{ color: 'white' }}>Login</ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/register" sx={{ color: 'white' }}>Register</ListItemButton>
                                </ListItem>
                            </>
                        )}
                        {userData && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/ChangePassword" sx={{ color: 'white' }}>Change Password</ListItemButton>
                                </ListItem>


                                {userData.role === 'user' && (
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/CandidateForm" sx={{ color: 'white' }}>Want To Post Your Candidature</ListItemButton>
                                        </ListItem>
                                        
                                   </>
                                )}





                                {userData.role === 'admin' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/CandidateList" sx={{ color: 'white' }}>
                                            CandidateList
                                        </ListItemButton>
                                    </ListItem>
                                )}



                                {userData.role === 'admin' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/AssignSupervisor" sx={{ color: 'white' }}>
                                            Assign Supervisor
                                        </ListItemButton>
                                    </ListItem>
                                )}




                                {userData.role === 'admin' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/DashboardSupervisor" sx={{ color: 'white' }}>
                                            Intern-Supervisor Dash
                                        </ListItemButton>
                                    </ListItem>
                                )}



                                
                                {userData.role === 'intern' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/SupervisorInfo" sx={{ color: 'white' }}>
                                            My Supervisor Info
                                        </ListItemButton>
                                    </ListItem>
                                )}

                                {userData.role === 'supervisor' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/InternInfo" sx={{ color: 'white' }}>
                                            My Interns
                                        </ListItemButton>
                                    </ListItem>
                                )}









                                {userData.role === 'admin' && (
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/UserManagement" sx={{ color: 'white' }}>User Management</ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/recruitmentsessions" sx={{ color: 'white' }}>Recruitment Sessions</ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/DashboardAdmin" sx={{ color: 'white' }}>Admin Dashboard</ListItemButton>
                                        </ListItem>
                                    </>
                                )}
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>

            
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>

           
            <footer style={{ background: 'linear-gradient(to right, #1976d2, #9c27b0)', padding: '20px 0' }}>
                <Container>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="body2" color="white" align="left">
                                &copy; {new Date().getFullYear()} Algo Consulting Group
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="white" align="right">
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
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }),
    handleLogout: PropTypes.func.isRequired,
};

export default Layout;
*/


import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, Container, Box, Grid, IconButton, Drawer, List, ListItem, ListItemButton, Avatar, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import UserCvUploadButton from './UserCvUploadButton';

const Layout = ({ children, userData, handleLogout }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { t } = useTranslation(); // Hook for translations

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #1976d2, #9c27b0)' }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={handleDrawerToggle} edge="start">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i className="bi bi-briefcase-fill me-2"></i>
                            {t('layout.Internship & Candidate Web App')}
                        </Link>
                    </Typography>

                    {userData && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                                avatar={<Avatar>{userData.email[0].toUpperCase()}</Avatar>}
                                label={`${userData.email} (${userData.role})`}
                                variant="outlined"
                                sx={{ color: 'white', borderColor: 'white' }}
                            />
                            <IconButton color="inherit" onClick={handleLogout}>
                                <Typography variant="body2">{t('layout.Logout')}</Typography>
                            </IconButton>
                        </Box>
                    )}




                    


                    {userData && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <UserCvUploadButton userId={userData.id} />
                        </Box>
                    )}



                    <LanguageSwitcher />

                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <Box sx={{ width: 250, height: '100vh', background: 'linear-gradient(to right, #1976d2, #9c27b0)', color: 'white', paddingTop: 2 }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/home" sx={{ color: 'white' }}>
                                {t('layout.Home')}
                            </ListItemButton>
                        </ListItem>
                        {!userData && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/login" sx={{ color: 'white' }}>
                                        {t('layout.Login')}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/register" sx={{ color: 'white' }}>
                                        {t('layout.Register')}
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                        {userData && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/ChangePassword" sx={{ color: 'white' }}>
                                        {t('layout.Change Password')}
                                    </ListItemButton>
                                </ListItem>
                                {userData.role === 'user' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/CandidateForm" sx={{ color: 'white' }}>
                                            {t('layout.Want To Post Your Candidature')}
                                        </ListItemButton>
                                    </ListItem>

                                )}





                              




                                {userData.role === 'admin' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/CandidateList" sx={{ color: 'white' }}>
                                            {t('layout.Candidate List')}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                {userData.role === 'admin' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/AssignSupervisor" sx={{ color: 'white' }}>
                                            {t('layout.Assign Supervisor')}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                {userData.role === 'admin' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/DashboardSupervisor" sx={{ color: 'white' }}>
                                            {t('layout.Intern-Supervisor Dash')}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                {userData.role === 'intern' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/SupervisorInfo" sx={{ color: 'white' }}>
                                            {t('layout.My Supervisor Info')}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                {userData.role === 'supervisor' && (
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/InternInfo" sx={{ color: 'white' }}>
                                            {t('layout.My Interns')}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                {userData.role === 'admin' && (
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/UserManagement" sx={{ color: 'white' }}>
                                                {t('layout.User Management')}
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/recruitmentsessions" sx={{ color: 'white' }}>
                                                {t('layout.Recruitment Sessions')}
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/DashboardAdmin" sx={{ color: 'white' }}>
                                                {t('layout.Admin Dashboard')}
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )}
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>

            <footer style={{ background: 'linear-gradient(to right, #1976d2, #9c27b0)', padding: '20px 0' }}>
                <Container>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="body2" color="white" align="left">
                                &copy; {new Date().getFullYear()} Algo Consulting Group
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="white" align="right">
                                {t('layout.All rights reserved.')}
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
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
    handleLogout: PropTypes.func.isRequired,
};

export default Layout;
