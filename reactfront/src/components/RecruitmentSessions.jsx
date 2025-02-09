/*
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import {
    CardHeader,
    CardContent,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
    Alert,
    Typography,
    Box,
    Grid,
    Paper,
    Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RecruitmentSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({
        name: '',
        year: '',
        comment: '',
        dateCreated: null,
        dateEnded: null,
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await axios.get(`${config.baseApiUrl}/api/RecruitmentSessions`);
            setSessions(response.data);
        } catch (err) {
            console.error('Failed to fetch sessions:', err);
            setError('Failed to fetch sessions.');
        }
    };

    const handleChange = (e) => {
        setNewSession({ ...newSession, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name, date) => {
        setNewSession({ ...newSession, [name]: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.post(`${config.baseApiUrl}/api/RecruitmentSessions`, newSession, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (response.status === 201) {
                setMessage('Recruitment session created successfully.');
                fetchSessions();
                setNewSession({
                    name: '',
                    year: '',
                    comment: '',
                    dateCreated: null,
                    dateEnded: null,
                });
            } else {
                setError('Failed to create recruitment session.');
            }
        } catch (err) {
            console.error('Failed to create recruitment session:', err);
            setError('Failed to create recruitment session.');
        }
    };

    const isActiveSession = (session) => {
        const now = new Date();
        return new Date(session.dateCreated) <= now && new Date(session.dateEnded) >= now;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ maxWidth: 800, margin: 'auto', mt: 5, p: 2 }}>
                <Paper elevation={3} sx={{ borderRadius: 2 }}>
                    <CardHeader
                        title="Recruitment Sessions"
                        titleTypographyProps={{ variant: 'h4', align: 'center', color: 'primary.main' }}
                        sx={{ bgcolor: 'primary.light', py: 3, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    />
                    <CardContent>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={newSession.name}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        sx={{ bgcolor: 'background.paper' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Year"
                                        name="year"
                                        type="number"
                                        value={newSession.year}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        sx={{ bgcolor: 'background.paper' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Comment"
                                        name="comment"
                                        value={newSession.comment}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{ bgcolor: 'background.paper' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DatePicker
                                        label="Date Created"
                                        value={newSession.dateCreated}
                                        onChange={(date) => handleDateChange('dateCreated', date)}
                                        renderInput={(params) => <TextField {...params} fullWidth required variant="outlined" sx={{ bgcolor: 'background.paper' }} />}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DatePicker
                                        label="Date Ended"
                                        value={newSession.dateEnded}
                                        onChange={(date) => handleDateChange('dateEnded', date)}
                                        renderInput={(params) => <TextField {...params} fullWidth required variant="outlined" sx={{ bgcolor: 'background.paper' }} />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' }, py: 1.5 }}>
                                        Create Session
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
                            Existing Sessions
                        </Typography>
                        <List>
                            {sessions.map((session) => (
                                <ListItem key={session.id} divider sx={{ bgcolor: 'background.paper', borderRadius: 1, mb: 1 }}>
                                    <ListItemText
                                        primary={`${session.name} (${session.year})`}
                                        secondary={session.comment}
                                        primaryTypographyProps={{ color: 'primary.main', fontWeight: 'bold' }}
                                        secondaryTypographyProps={{ color: 'text.secondary' }}
                                    />
                                    <ListItemSecondaryAction>
                                        <Chip
                                            label={`${new Date(session.dateCreated).toLocaleDateString()} - ${new Date(session.dateEnded).toLocaleDateString()}`}
                                            color="secondary"
                                            variant="outlined"
                                            sx={{ mr: 2 }}
                                        />
                                        <Chip
                                            label={isActiveSession(session) ? 'Active' : 'Closed'}
                                            color={isActiveSession(session) ? 'success' : 'error'}
                                            variant="outlined"
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button component={Link} to="/" variant="outlined" sx={{ color: 'primary.main', borderColor: 'primary.main', px: 4, py: 1.5 }}>
                                Go Back
                            </Button>
                        </Box>
                    </CardContent>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default RecruitmentSessions;

*/


import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import {
    CardHeader,
    CardContent,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
    Alert,
    Typography,
    Box,
    Grid,
    Paper,
    Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';

const RecruitmentSessions = () => {
    const { t } = useTranslation();
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({
        name: '',
        year: '',
        comment: '',
        dateCreated: null,
        dateEnded: null,
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await axios.get(`${config.baseApiUrl}/api/RecruitmentSessions`);
            setSessions(response.data);
        } catch (err) {
            console.error('Failed to fetch sessions:', err);
            setError(t('error_fetching_sessions'));
        }
    };

    const handleChange = (e) => {
        setNewSession({ ...newSession, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name, date) => {
        setNewSession({ ...newSession, [name]: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.post(`${config.baseApiUrl}/api/RecruitmentSessions`, newSession, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (response.status === 201) {
                setMessage(t('session_created_successfully'));
                fetchSessions();
                setNewSession({
                    name: '',
                    year: '',
                    comment: '',
                    dateCreated: null,
                    dateEnded: null,
                });
            } else {
                setError(t('failed_create_session'));
            }
        } catch (err) {
            console.error('Failed to create recruitment session:', err);
            setError(t('failed_create_session'));
        }
    };

    const isActiveSession = (session) => {
        const now = new Date();
        return new Date(session.dateCreated) <= now && new Date(session.dateEnded) >= now;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ maxWidth: 800, margin: 'auto', mt: 5, p: 2 }}>
                <Paper elevation={3} sx={{ borderRadius: 2 }}>
                    <CardHeader
                        title={t('recruitment_sessions')}
                        titleTypographyProps={{ variant: 'h4', align: 'center', color: 'primary.main' }}
                        sx={{ bgcolor: 'primary.light', py: 3, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    />
                    <CardContent>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label={t('name')}
                                        name="name"
                                        value={newSession.name}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        sx={{ bgcolor: 'background.paper' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label={t('year')}
                                        name="year"
                                        type="number"
                                        value={newSession.year}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        sx={{ bgcolor: 'background.paper' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={t('comment')}
                                        name="comment"
                                        value={newSession.comment}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{ bgcolor: 'background.paper' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DatePicker
                                        label={t('date_created')}
                                        value={newSession.dateCreated}
                                        onChange={(date) => handleDateChange('dateCreated', date)}
                                        renderInput={(params) => <TextField {...params} fullWidth required variant="outlined" sx={{ bgcolor: 'background.paper' }} />}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DatePicker
                                        label={t('date_ended')}
                                        value={newSession.dateEnded}
                                        onChange={(date) => handleDateChange('dateEnded', date)}
                                        renderInput={(params) => <TextField {...params} fullWidth required variant="outlined" sx={{ bgcolor: 'background.paper' }} />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' }, py: 1.5 }}>
                                        {t('create_session')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
                            {t('existing_sessions')}
                        </Typography>
                        <List>
                            {sessions.map((session) => (
                                <ListItem key={session.id} divider sx={{ bgcolor: 'background.paper', borderRadius: 1, mb: 1 }}>
                                    <ListItemText
                                        primary={`${session.name} (${session.year})`}
                                        secondary={session.comment}
                                        primaryTypographyProps={{ color: 'primary.main', fontWeight: 'bold' }}
                                        secondaryTypographyProps={{ color: 'text.secondary' }}
                                    />
                                    <ListItemSecondaryAction>
                                        <Chip
                                            label={`${new Date(session.dateCreated).toLocaleDateString()} - ${new Date(session.dateEnded).toLocaleDateString()}`}
                                            color="secondary"
                                            variant="outlined"
                                            sx={{ mr: 2 }}
                                        />
                                        <Chip
                                            label={isActiveSession(session) ? t('active') : t('closed')}
                                            color={isActiveSession(session) ? 'success' : 'error'}
                                            variant="outlined"
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button component={Link} to="/" variant="outlined" sx={{ color: 'primary.main', borderColor: 'primary.main', px: 4, py: 1.5 }}>
                                {t('go_back')}
                            </Button>
                        </Box>
                    </CardContent>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default RecruitmentSessions;
