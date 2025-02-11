
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';

const UserCvUploadButton = ({ userId }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${config.baseApiUrl}/api/UserCv/${userId}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file.');
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="text" onClick={handleOpen} sx={{ color: 'white' }}>
                Upload
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6">Upload Your CV</Typography>
                    <TextField type="file" onChange={handleFileChange} sx={{ mt: 2 }} />
                    <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
                        Upload
                    </Button>
                    {message && <Typography variant="body1" color="error" sx={{ mt: 2 }}>{message}</Typography>}
                </Box>
            </Modal>
        </div>
    );
};

UserCvUploadButton.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserCvUploadButton;
