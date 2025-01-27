/*
import PropTypes from 'prop-types';
import CandidateForm from './CandidateForm'; // Import CandidateForm

const Home = ({ userData, candidates, fetchSummary, isLoadingSummary, isSummaryModalOpen, summaryData, closeSummaryModal, handleDeleteCandidate, error, handleLogout }) => (
    <div>
        <h1>Welcome to the Home Page</h1>
        {userData && <p>Logged in as: {userData.email} (Role: {userData.role})</p>}

        <div>
            {userData?.role === 'admin' && (
                <>
                    <button onClick={fetchSummary} disabled={isLoadingSummary}>
                        {isLoadingSummary ? "Loading..." : "Check Summary"}
                    </button>
                </>
            )}

            {userData && userData.role === 'user' && <CandidateForm />}

            {userData && <button onClick={handleLogout}>Logout</button>}
        </div>

        {userData?.role === 'admin' ? (
            <>
                <h2>Candidates</h2>
                {error && <div>{error}</div>}
                <ul>
                    {candidates.map((candidate) => (
                        <li key={candidate.id}>
                            <div>{candidate.firstName} {candidate.lastName}</div>
                            <button onClick={() => handleDeleteCandidate(candidate.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </>
        ) : (
            userData && <p>You are logged in as a candidate. Please submit your application.</p>
        )}

        {!userData && <p>Please log in to continue.</p>}

        {isSummaryModalOpen && (
            <div style={{ display: 'block' }}>
                <div>
                    <div>
                        <div>
                            <h5>Summary</h5>
                            <button type="button" onClick={closeSummaryModal}>Close</button>
                        </div>
                        <div>
                            {summaryData ? (
                                <div>
                                    <p>Total Interns: {summaryData.totalInterns}</p>
                                    <p>Total Candidates: {summaryData.totalCandidates}</p>
                                    <p>Total Recruitment Sessions: {summaryData.totalRecruitmentSessions}</p>
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);

Home.propTypes = {
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }),
    candidates: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSummary: PropTypes.func.isRequired,
    isLoadingSummary: PropTypes.bool.isRequired,
    isSummaryModalOpen: PropTypes.bool.isRequired,
    summaryData: PropTypes.shape({
        totalInterns: PropTypes.number,
        totalCandidates: PropTypes.number,
        totalRecruitmentSessions: PropTypes.number,
    }),
    closeSummaryModal: PropTypes.func.isRequired,
    handleDeleteCandidate: PropTypes.func.isRequired,
    error: PropTypes.string,
    handleLogout: PropTypes.func.isRequired,
};

export default Home; */

//everything up same as this but without bootstrap

import PropTypes from 'prop-types';
import CandidateForm from './CandidateForm';
import { Link } from 'react-router-dom'; // Import Link here!
//import ChangePassword from './ChangePassword';
import Dashboard from '../Dashboard';


const Home = ({
    userData,
    candidates,
    fetchSummary,
    isLoadingSummary,
    isSummaryModalOpen,
    summaryData,
    closeSummaryModal,
    handleDeleteCandidate,
    error,
    handleLogout,
}) =>  (  




    <div className="container mt-5">
        <h1 className="display-4 mb-4">Welcome to the Home Page</h1>



        {/* this one line i cmnt show the change pswrd form in home
        {userData && (
            <div className="d-flex justify-content-between align-items-center mb-4">
                 ... other buttons 
                <ChangePassword /> 
            </div>
        )}

        * /}

        {/* This one bellow is the button in app jsx i made the link */}

        {userData && (
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* Other Buttons */}

                <Link to="/ChangePassword" className="btn btn-warning">Change Password</Link>
               
            </div>
        )}



        {userData && (userData.role === 'admin' || userData.role === 'user') && <Dashboard />}
        


        {/* This one bellow is the button in app jsx i made the link and send u to usermanagement admin only */}
        {userData?.role === 'admin' && (
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* Other Buttons */}
                <Link to="/UserManagement" className="btn btn-warning">User Management</Link>

                <Link to="/recruitmentsessions" className="btn btn-secondary">Manage Recruitment Sessions</Link>
            </div>
        )}


        {userData && (
            <div className="alert alert-info" role="alert">
                Logged in as: {userData.email} (Role: {userData.role})
            </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-4">
            {userData?.role === 'admin' && (
                <button
                    className="btn btn-primary"
                    onClick={fetchSummary}
                    disabled={isLoadingSummary}
                >
                    {isLoadingSummary ? 'Loading...' : 'Check Summary'}
                </button>
            )}

            {userData && userData.role === 'user' && <CandidateForm />}

            {userData && (
                <button className="btn btn-secondary" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>

        {userData?.role === 'admin' && (
            <div>
                <h2 className="mb-3">Candidates</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <ul className="list-group">
                    {candidates.map((candidate) => (
                        <li
                            key={candidate.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                {candidate.firstName} {candidate.lastName}
                            </div>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteCandidate(candidate.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {!userData && (
            <div className="alert alert-warning" role="alert">
                Please log in to continue.
            </div>
        )}

        {isSummaryModalOpen && (
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Summary</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeSummaryModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {summaryData ? (
                                <div>
                                    <p>Total Interns: {summaryData.totalInterns}</p>
                                    <p>Total Candidates: {summaryData.totalCandidates}</p>
                                    <p>
                                        Total Recruitment Sessions: {summaryData.totalRecruitmentSessions}
                                    </p>
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={closeSummaryModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);

Home.propTypes = {
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }),
    candidates: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSummary: PropTypes.func.isRequired,
    isLoadingSummary: PropTypes.bool.isRequired,
    isSummaryModalOpen: PropTypes.bool.isRequired,
    summaryData: PropTypes.shape({
        totalInterns: PropTypes.number,
        totalCandidates: PropTypes.number,
        totalRecruitmentSessions: PropTypes.number,
    }),
    closeSummaryModal: PropTypes.func.isRequired,
    handleDeleteCandidate: PropTypes.func.isRequired,
    error: PropTypes.string,
    handleLogout: PropTypes.func.isRequired,
};

export default Home;