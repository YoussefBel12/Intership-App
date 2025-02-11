import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config';

const UserCvViewer = ({ userId }) => {
    const [cvUrl, setCvUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCvUrl = async () => {
            try {
                const response = await axios.get(`${config.baseApiUrl}/api/UserCv/${userId}/cv`, {
                    responseType: 'blob'
                });
                const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                setCvUrl(url);
            } catch (err) {
                console.error('Error fetching CV:', err);
                setError('Failed to load CV');
            }
        };

        fetchCvUrl();
    }, [userId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {cvUrl ? (
                <iframe src={cvUrl} width="100%" height="600px" title="User CV" />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

UserCvViewer.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserCvViewer;
