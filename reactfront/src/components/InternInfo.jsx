/*
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const InternInfo = () => {
    const [interns, setInterns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.baseApiUrl}/api/supervisors/interns`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInterns(response.data);
            } catch (err) {
                console.error("Error fetching interns:", err);
                setError("Failed to fetch interns information.");
            }
        };

        fetchInterns();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!interns || interns.length === 0) {
        return <p>No interns assigned yet.</p>; // Or a loading spinner if fetching
    }

    return (
        <div>
            <h2>Your Interns</h2>
            <ul>
                {interns.map((intern) => (
                    <li key={intern.id}>
                        {intern.userName} - {intern.email}
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InternInfo;
*/


import  { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const InternInfo = () => {
    const [interns, setInterns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.baseApiUrl}/api/supervisors/interns`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInterns(response.data);
            } catch (err) {
                console.error("Error fetching interns:", err);
                setError("Failed to fetch interns information.");
            }
        };

        fetchInterns();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!interns || interns.length === 0) {
        return <p>No interns assigned yet.</p>;
    }

    return (
        <div>
            <h2>Your Interns</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {interns.map((intern) => (
                        <tr key={intern.id} style={{ backgroundColor: interns.indexOf(intern) % 2 === 0 ? '#f2f2f2' : 'white' }}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                {intern.firstName && intern.lastName ? `${intern.firstName} ${intern.lastName}` : intern.userName || "N/A"}
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>{intern.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InternInfo;