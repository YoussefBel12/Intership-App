import PropTypes from 'prop-types';
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
    toggleCandidateDetails,
    selectedCandidate,

}) => ( 

    < div className = "container mt-5" >
     
        < div className = "text-center p-5 rounded-3 shadow mb-4"
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



        {userData && (userData.role === 'admin' || userData.role === 'user') && <Dashboard />}
        


        {userData?.role === 'admin' && (
            <div className="p-4 rounded-3 shadow" style={{
                background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
                <h2 className="mb-3">Candidates</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <ul className="list-group">
                    {candidates.map((candidate) => (
                        <li
                            key={candidate.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                            }}
                        >
                            <div>
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleCandidateDetails(candidate.id)}
                                >
                                    {candidate.firstName} {candidate.lastName}
                                </span>
                                {selectedCandidate === candidate.id && (
                                    <div className="mt-2">
                                        <p><strong>Email:</strong> {candidate.email}</p>
                                        <p><strong>School:</strong> {candidate.school}</p>
                                        <p><strong>Level:</strong> {candidate.level}</p>
                                        <p><strong>Date Of Candidature:</strong> {candidate.dateCreated}</p>
                                        <p><strong>Recruitment Session:</strong> {candidate.recruitmentSessionId}</p>
                                        {/* Add more fields as needed */}
                                    </div>
                                )}
                            </div>

                            <div>
                                <a
                                    href={candidate.cvFilePath}
                                    className="btn btn-sm btn-info me-2"
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


    toggleCandidateDetails: PropTypes.func.isRequired, // Add this line
    selectedCandidate: PropTypes.number, // Add this line

};

export default Home;