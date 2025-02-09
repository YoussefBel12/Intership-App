
import  { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import Registration from './components/Registration';
//import Login from './components/Login';

import Home from './components/Home';
import CandidateForm from './components/CandidateForm';
import Layout from './components/Layout';
//import RecruitmentSession from './components/RecruitmentSession';
import ChangePassword from './components/ChangePassword';
import './App.css'
import UserManagement from './components/UserManagement';
import RecruitmentSessions from './components/RecruitmentSessions';
import AuthPage from './components/AuthPage';
import SupervisorInfo from './components/SupervisorInfo';
import InternInfo from './components/InternInfo';
import DashboardAdmin from './components/DashboardAdmin';
import CandidateList from './components/CandidateList';
import AssignSupervisor from './components/AssignSupervisor';
import DashboardSupervisor from './components/DashboardSupervisor';


const App = () => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [candidates, setCandidates] = useState([]);

    // State to track the selected candidate
    const [selectedCandidate, setSelectedCandidate] = useState(null);
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

    const handleLogin = async (username, password, rememberMe) => {
        try {
            const response = await axios.post(`${config.baseApiUrl}/api/Auth/login`, { email: username, password: password, rememberMe: rememberMe  });
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

    

    // Function to toggle candidate details
    const toggleCandidateDetails = (candidateId) => {
        if (selectedCandidate === candidateId) {
            setSelectedCandidate(null); // Hide details if already selected
        } else {
            setSelectedCandidate(candidateId); // Show details for the clicked candidate
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

   
    return (
        <div >
            {/*u see this layout under i added words next to it*/ }
            <Layout userData={userData} handleLogout={handleLogout}>
                <Routes>
                    {/* the two route send u to the change password link url */}

                    <Route path="/ChangePassword" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/CandidateForm" element={isLoggedIn && userData?.role === 'user' ? <CandidateForm /> : <Navigate to="/login" />} />
                    {/*     <Route path="/UserManagement" element={<UserManagement />} />   */}
                    <Route path="/recruitmentsessions" element={isLoggedIn && userData?.role === 'admin' ? <RecruitmentSessions /> : <Navigate to="/login" />} />
                    <Route path="/UserManagement" element={isLoggedIn && userData?.role === 'admin' ? <UserManagement /> : <Navigate to="/login" />} />
                    <Route path="/DashboardAdmin" element={isLoggedIn && userData?.role === 'admin' ? <DashboardAdmin /> : <Navigate to="/login" />} />
                    <Route path="/DashboardSupervisor" element={isLoggedIn && userData?.role === 'admin' ? <DashboardSupervisor /> : <Navigate to="/login" />} />

                    <Route
                        path="/CandidateList"
                        element={
                            isLoggedIn && userData?.role === 'admin' ? (
                                <CandidateList
                                    candidates={candidates}
                                    error={error}
                                    toggleCandidateDetails={toggleCandidateDetails}
                                    selectedCandidate={selectedCandidate}
                                    handleDeleteCandidate={handleDeleteCandidate}
                                   
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                  
                    <Route path="/SupervisorInfo" element={isLoggedIn && userData?.role === 'intern' ? <SupervisorInfo /> : <Navigate to="/login" />} />
                    <Route path="/InternInfo" element={isLoggedIn && userData?.role === 'supervisor' ? <InternInfo /> : <Navigate to="/login" />} />

                    <Route path="/AssignSupervisor" element={isLoggedIn && userData?.role === 'admin' ? <AssignSupervisor /> : <Navigate to="/login" />} />
                   
                <Route path="/login" element={!isLoggedIn ? <AuthPage handleLogin={handleLogin} error={error} setError={setError} /> : <Navigate to="/home" />} />
                <Route path="/home" element={isLoggedIn ? <Home
                        userData={userData}
                        //         candidates={candidates}
                        fetchSummary={fetchSummary}
                        isLoadingSummary={isLoadingSummary}
                        isSummaryModalOpen={isSummaryModalOpen}
                        summaryData={summaryData}
                        closeSummaryModal={closeSummaryModal}
                        //         handleDeleteCandidate={handleDeleteCandidate}
                        //           error={error}
                        //         selectedCandidate={selectedCandidate}
                        //       toggleCandidateDetails={toggleCandidateDetails }
                        handleLogout={handleLogout}
                        isLoggedIn={isLoggedIn }
                /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Registration />} />
                </Routes>
            </Layout>

           
        </div>

        
    );
};

export default App;