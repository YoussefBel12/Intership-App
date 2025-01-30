
import PropTypes from 'prop-types';
//import CandidateForm from './CandidateForm';
//import { Link } from 'react-router-dom'; // Import Link here!
//import ChangePassword from './ChangePassword';
import Dashboard from '../Dashboard';


const Home = ({
    userData,
    candidates,
    //   fetchSummary,
    //  isLoadingSummary,
    isSummaryModalOpen,
    summaryData,
    closeSummaryModal,
    handleDeleteCandidate,
    error,
    //  handleLogout,
}) => (



    {/* old title becarful it store the whole page div

    <div className="container mt-5">
        <h1 className="display-4 mb-4">Welcome to the Home Page</h1>

        */}

    < div className = "container mt-5" >
     
        < div
className = "text-center p-5 rounded-3 shadow mb-4"
style = {{
    background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
        color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
    >
        <i className="bi bi-house-door-fill display-4 mb-3"></i>
        <h1 className="display-4 mb-3 fw-bold">Welcome to the Home Page</h1>
        <p className="lead">Manage internships, candidates, and recruitment sessions with ease.</p>
    </div >



     




        {/* This one bellow is the button in app jsx i made the link 

        {userData && (
            <div className="d-flex justify-content-between align-items-center mb-4">
                

                <Link to="/ChangePassword" className="btn btn-warning">Change Password</Link>
               
            </div>
        )}
        */}



        {userData && (userData.role === 'admin' || userData.role === 'user') && <Dashboard />}
        


        {/* This one bellow is the button in app jsx i made the link and send u to usermanagement admin only also i cmnt it out cuz i made em in layout 

        {userData?.role === 'admin' && (
            <div className="d-flex justify-content-between align-items-center mb-4">
              
                <Link to="/UserManagement" className="btn btn-warning">User Management</Link>

                <Link to="/recruitmentsessions" className="btn btn-secondary">Manage Recruitment Sessions</Link>
            </div>
        )}

        */}




        {/* this one is admin and role but ii made it in layout also summary

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


            */}



        {/*this is the candidate form 

            {userData && userData.role === 'user' && <CandidateForm />}

            */}


        {/*logout 
            {userData && (
                <button className="btn btn-secondary" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
        */}


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

                            <div>
                            <a
                                href={candidate.cvFilePath}
                                className="btn btn-sm btn-info"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View CV
                            </a>


                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteCandidate(candidate.id)}
                            >
                                Delete
                                </button>

                            </div>
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