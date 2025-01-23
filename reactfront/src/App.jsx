/*
import Registration from './components/Registration';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import config from './config';
import Layout from './components/Layout';



const App = () => {

 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [summaryData, setSummaryData] = useState(null);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            fetchUserData();
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn && token && userData?.role === 'admin') { //Fetch candidates only if admin
            fetchCandidates();
        }
    }, [isLoggedIn, token, userData]); //Add userData as dependency

    

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post(`${config.baseApiUrl}/api/Auth/login`, { email: username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);
            setIsLoggedIn(true);
            fetchUserData();
            navigate('/home');
        } catch (err) {
            setError('Invalid credentials.');
            console.error("Login Error:", err);
        }
    };

    const fetchUserData = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.get(`${config.baseApiUrl}/api/Auth/me`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setUserData(response.data);
            setError(null);
        } catch (error) {
            console.error("Fetch User Data Error:", error);
            handleApiError(error);
        }
    };

    const fetchCandidates = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.get(`${config.baseApiUrl}/api/candidates`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setCandidates(response.data);
            setError(null);
        } catch (error) {
            handleApiError(error);
        }
    };

    const fetchSummary = async () => {
        setIsLoadingSummary(true);
        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.get(`${config.baseApiUrl}/api/Summary`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setSummaryData(response.data);
            setIsSummaryModalOpen(true);
            setError(null);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoadingSummary(false);
        }
    };

    const handleApiError = (error) => {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setToken(null);
            setIsLoggedIn(false);
            setUserData(null);
            navigate('/login');
            setError("Session expired. Please login again.");
        } else if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError("An error occurred.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        setUserData(null);
        setCandidates([]);
        setSummaryData(null);
        navigate('/login');
    };

    const handleDeleteCandidate = async (candidateId) => {
        try {
            const storedToken = localStorage.getItem('token');
            await axios.delete(`${config.baseApiUrl}/api/candidates/${candidateId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            fetchCandidates();
        } catch (error) {
            handleApiError(error);
        }
    };

    const closeSummaryModal = () => {
        setIsSummaryModalOpen(false);
    };

    const CandidateForm = () => {
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            school: '',
            level: '',
            cvFile: null,
            cvFilePath: '', // Add CvFilePath to the form data
            recruitmentSessionId: 1,
        });
        const [submitError, setSubmitError] = useState(null);
        const [submitSuccess, setSubmitSuccess] = useState(false);

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleFileChange = (e) => {
            setFormData({ ...formData, cvFile: e.target.files[0] });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setSubmitError(null);
            setSubmitSuccess(false);

            // Basic client-side validation (optional)
            if (!formData.cvFile && !formData.cvFilePath) {
                setSubmitError("Please select a CV file or enter a custom path.");
                return;
            }

            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key] === null ? "" : formData[key]);
            }
            if (formData.cvFile) {
                formDataToSend.append('CvFile', formData.cvFile, formData.cvFile.name);
            }

            try {
                const storedToken = localStorage.getItem('token');
                const response = await axios.post(`${config.baseApiUrl}/api/candidates`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        'Content-Type': `multipart/form-data; boundary=${formDataToSend._boundary}`,
                    },
                });
                console.log("Axios Response:", response);
                setSubmitSuccess(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    school: '',
                    level: '',
                    cvFile: null,
                    cvFilePath: '',
                    recruitmentSessionId: 1,
                });
            } catch (error) {
                // More detailed error handling
                console.error("Full Error Object:", error); // Log the full error object for debugging

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Error Response Data:", error.response.data); // Log the server's response data
                    console.error("Error Response Status:", error.response.status); // Log the status code
                    console.error("Error Response Headers:", error.response.headers); // Log the response headers

                    if (error.response.data && error.response.data.errors) {
                        //If there are validation errors from the backend
                        let errorMessage = "";
                        for (const key in error.response.data.errors) {
                            errorMessage += error.response.data.errors[key].join("\n") + "\n";
                        }
                        setSubmitError(errorMessage);
                    }
                    else if (error.response.data && error.response.data.message) {
                        //If there is a general message from the backend
                        setSubmitError(error.response.data.message);
                    }
                    else {
                        setSubmitError("Server responded with an error.");
                    }

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.error("Error Request:", error.request);
                    setSubmitError("No response received from the server.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error Message:', error.message);
                    setSubmitError("Error setting up the request.");
                }
            }
        };

        return (
            <div >
                <h2>Submit Your Candidature</h2>
                {submitError && <div >{submitError}</div>}
                {submitSuccess && <div >Candidature submitted successfully!</div>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="text" name="school" placeholder="School" value={formData.school} onChange={handleChange} required />
                    <input type="text" name="level" placeholder="Level" value={formData.level} onChange={handleChange} required />

                    <input type="file" name="cvFile" onChange={handleFileChange} />
                    <input type="text" name="cvFilePath" placeholder="Custom Cv File Path (optional)" value={formData.cvFilePath} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    };


  

    const Login = () => {
        return (
            <div >
                <h2>Login</h2>
                {error && <div >{error}</div>}
                <input type="text" placeholder="Email" id="username" />
                <input type="password" placeholder="Password" id="password" />
                <button onClick={() => handleLogin(document.getElementById('username').value, document.getElementById('password').value)}>Login</button>
            </div>
        );
    };

    const Home = () => {
        return (
            <div >
                <h1>Welcome to the Home Page</h1>
                {userData && <p>Logged in as: {userData.email} (Role: {userData.role})</p>}
                <div >
                    {userData?.role === 'admin' && (
                        <button  onClick={fetchSummary} disabled={isLoadingSummary}>
                            {isLoadingSummary ? "Loading..." : "Check Summary"}
                        </button>
                    )}
                    <button  onClick={handleLogout}>Logout</button>
                </div>

                {userData?.role === 'admin' ? (
                    <>
                        <h2>Candidates</h2>
                        {error && <div >{error}</div>}
                        <ul >
                            {candidates.map((candidate) => (
                                <li key={candidate.id} >
                                    {candidate.firstName} {candidate.lastName}
                                    <button  onClick={() => handleDeleteCandidate(candidate.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <CandidateForm />
                )}

                {isSummaryModalOpen && (
                    <div >
                        <div >
                            <span  onClick={closeSummaryModal}>&times;</span>
                            <h2>Summary</h2>
                            {summaryData ? (
                                <div>
                                    <p>Total Interns: {summaryData.totalInterns}</p>
                                    <p>Total Candidates: {summaryData.totalCandidates}</p>
                                    <p>Total Recruitment Sessions: {summaryData.totalRecruitmentSessions}</p>
                                </div>
                            ) : (
                                <div >Loading...</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };


    const AuthPage = () => (
        <div >
            <Registration />
            <Login /> {}
        </div>
    );


    return (

   


        <div >
            <Layout userData={userData} handleLogout={handleLogout}>
                <Routes>
                    <Route path="/login" element={!isLoggedIn ? <AuthPage /> : <Navigate to="/home" />} />
                    <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Layout>
        </div>




    );
};

export default App;
   */

import  { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import CandidateForm from './components/CandidateForm';
import Layout from './components/Layout';
//import RecruitmentSession from './components/RecruitmentSession';
import ChangePassword from './components/ChangePassword';
import './App.css'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [summaryData, setSummaryData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(localStorage.getItem('userData')));
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn && userData?.role === 'admin') {
            fetchCandidates();
        }
    }, [isLoggedIn, userData]);

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post(`${config.baseApiUrl}/api/Auth/login`, { email: username, password });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            fetchUserData();
            navigate('/home');
        } catch (err) {
            setError('Invalid credentials.');
            console.error("Login Error:", err);
        }
    };

    const fetchUserData = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.get(`${config.baseApiUrl}/api/Auth/me`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setUserData(response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));
            setError(null);
        } catch (error) {
            console.error("Fetch User Data Error:", error);
            handleApiError(error);
        }
    };

    const fetchCandidates = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.get(`${config.baseApiUrl}/api/candidates`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setCandidates(response.data);
            setError(null);
        } catch (error) {
            handleApiError(error);
        }
    };

    const fetchSummary = async () => {
        setIsLoadingSummary(true);
        try {
            const storedToken = localStorage.getItem('token');
            const response = await axios.get(`${config.baseApiUrl}/api/Summary`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setSummaryData(response.data);
            setIsSummaryModalOpen(true);
            setError(null);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoadingSummary(false);
        }
    };

    const handleApiError = (error) => {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            setIsLoggedIn(false);
            setUserData(null);
            navigate('/login');
            setError("Session expired. Please login again.");
        } else if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError("An error occurred.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUserData(null);
        setCandidates([]);
        setSummaryData(null);
        navigate('/login');
    };

    const handleDeleteCandidate = async (candidateId) => {
        try {
            const storedToken = localStorage.getItem('token');
            await axios.delete(`${config.baseApiUrl}/api/candidates/${candidateId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            fetchCandidates();
        } catch (error) {
            handleApiError(error);
        }
    };

    const closeSummaryModal = () => {
        setIsSummaryModalOpen(false);
    };

    const AuthPage = () => (
        <div>
            <h1>Please sign in</h1>
            <Login handleLogin={handleLogin} error={error} setError={setError} />
            <Registration />
        </div>
    );

    return (
        <div >
             <Layout>
                <Routes>
                    {/* the two route send u to the change password link url */}

                    <Route path="/ChangePassword" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />




                <Route path="/login" element={!isLoggedIn ? <AuthPage handleLogin={handleLogin} error={error} setError={setError} /> : <Navigate to="/home" />} />
                <Route path="/home" element={isLoggedIn ? <Home
                    userData={userData}
                    candidates={candidates}
                    fetchSummary={fetchSummary}
                    isLoadingSummary={isLoadingSummary}
                    isSummaryModalOpen={isSummaryModalOpen}
                    summaryData={summaryData}
                    closeSummaryModal={closeSummaryModal}
                    handleDeleteCandidate={handleDeleteCandidate}
                    error={error}
                    handleLogout={handleLogout}
                /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Registration />} />
                </Routes>
            </Layout>

            {isLoggedIn && userData?.role === 'candidate' && <CandidateForm />}
        </div>
    );
};

export default App;