/*
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const SupervisorInfo = () => {
    const [supervisor, setSupervisor] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupervisor = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.baseApiUrl}/api/interns/supervisor`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSupervisor(response.data);
            } catch (err) {
                console.error("Error fetching supervisor:", err);
                setError("Failed to fetch supervisor information.");
            }
        };

        fetchSupervisor();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!supervisor) {
        return <p>Loading supervisor information...</p>; // Or a loading spinner
    }

    return (
        <div>
            <h2>Your Supervisor</h2>
            <p>Name: {supervisor.firstName} {supervisor.lastName}</p>
            <p>Email: {supervisor.email}</p>
           
        </div>
    );
};

export default SupervisorInfo;

        */


import  { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const SupervisorInfo = () => {
    const [supervisor, setSupervisor] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupervisor = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.baseApiUrl}/api/interns/supervisor`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSupervisor(response.data);
            } catch (err) {
                console.error("Error fetching supervisor:", err);
                setError("Failed to fetch supervisor information.");
            }
        };

        fetchSupervisor();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!supervisor) {
        return <p>Loading supervisor information...</p>;
    }

    return (
        <div style={{ fontFamily: 'sans-serif' }}> {/* Base font */}
            <h2 style={{ color: '#3f51b5', marginBottom: '16px' }}>Your Supervisor</h2> {/* Blue heading */}
            <div style={{
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'  // Subtle shadow
            }}>
                <p style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#555' }}>Name:</strong> {/* Darker label color */}
                    {supervisor.firstName} {supervisor.lastName}
                </p>
                <p style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#555' }}>Email:</strong>
                    {supervisor.email}
                </p>
                {/* Add other supervisor details here */}
            </div>
        </div>
    );
};

export default SupervisorInfo;