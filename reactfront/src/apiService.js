
import config from './config';

const apiUrl = config.baseApiUrl;

export const getCandidates = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/candidates`);
        if (!response.ok) {
            throw new Error('Error fetching candidates');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
};

export const addCandidate = async (candidateData) => {
    try {
        const response = await fetch(`${apiUrl}/api/candidates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(candidateData),
        });

        if (!response.ok) {
            throw new Error('Error adding candidate');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding candidate:', error);
    }
};

export const deleteCandidate = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/api/candidates/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting candidate');
        }
    } catch (error) {
        console.error('Error deleting candidate:', error);
    }
}; 
