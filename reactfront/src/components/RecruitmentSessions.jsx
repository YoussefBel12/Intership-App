import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';

const RecruitmentSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({
        name: '',
        year: '',
        comment: '',
        dateCreated: '',
        dateEnded: ''
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
                    dateCreated: '',
                    dateEnded: ''
                });
            } else {
                setError('Failed to create recruitment session.');
            }
        } catch (err) {
            console.error('Failed to create recruitment session:', err);
            setError('Failed to create recruitment session.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h2 className="card-title mb-0">Recruitment Sessions</h2>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={newSession.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="year" className="form-label">Year</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="year"
                                    name="year"
                                    value={newSession.year}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <input
                                type="text"
                                className="form-control"
                                id="comment"
                                name="comment"
                                value={newSession.comment}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="dateCreated" className="form-label">Date Created</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateCreated"
                                    name="dateCreated"
                                    value={newSession.dateCreated}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="dateEnded" className="form-label">Date Ended</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateEnded"
                                    name="dateEnded"
                                    value={newSession.dateEnded}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Create Session</button>
                    </form>
                    <h3>Existing Sessions</h3>
                    <ul className="list-group">
                        {sessions.map(session => (
                            <li key={session.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{session.name}</strong> ({session.year}) - {session.comment}
                                </div>
                                <span className="badge bg-primary rounded-pill">{new Date(session.dateCreated).toLocaleDateString()} - {new Date(session.dateEnded).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="text-center mt-3">
                        <Link to="/" className="btn btn-secondary">Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruitmentSessions;

