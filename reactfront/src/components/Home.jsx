/*
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard';


const Home = ({
    userData,
    isSummaryModalOpen,
    summaryData,
    closeSummaryModal,


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



     
        
        {userData && <Dashboard />}
       





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

    fetchSummary: PropTypes.func.isRequired,
    isLoadingSummary: PropTypes.bool.isRequired,
    isSummaryModalOpen: PropTypes.bool.isRequired,
    summaryData: PropTypes.shape({
        totalInterns: PropTypes.number,
        totalCandidates: PropTypes.number,
        totalRecruitmentSessions: PropTypes.number,
    }),
    closeSummaryModal: PropTypes.func.isRequired,
 
    handleLogout: PropTypes.func.isRequired,


};

export default Home;
*/

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dashboard from '../Dashboard';
import DashboardAdmin from './DashboardAdmin';
import DashboardSupervisor from './DashboardSupervisor';



const Home = ({
    userData,
    isSummaryModalOpen,
    summaryData,
    closeSummaryModal,
    isLoggedIn,
}) => {
    const { t } = useTranslation(); // Hook for translations

    return (
        <div className="container mt-5">
            <div
                className="text-center p-5 rounded-3 shadow mb-4"
                style={{
                    background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                <i className="bi bi-house-door-fill display-4 mb-3"></i>
                <h1 className="display-4 mb-3 fw-bold">{t('home.Welcome to the Home Page')}</h1>
                <p className="lead">{t('home.Manage internships, candidates, and recruitment sessions with ease.')}</p>
            </div>

            {userData && <Dashboard />}

            {!userData && (
                <div className="alert alert-warning" role="alert">
                    {t('home.Please log in to continue.')}
                </div>
            )}




            {isLoggedIn && userData && userData.role === 'admin' && (
                <DashboardAdmin />
            )}

            {isLoggedIn && userData && userData.role === 'admin' && (
                <DashboardSupervisor />
            )}





            {isSummaryModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{t('home.Summary')}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeSummaryModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {summaryData ? (
                                    <div>
                                        <p>{t('home.Total Interns')}: {summaryData.totalInterns}</p>
                                        <p>{t('home.Total Candidates')}: {summaryData.totalCandidates}</p>
                                        <p>{t('home.Total Recruitment Sessions')}: {summaryData.totalRecruitmentSessions}</p>
                                    </div>
                                ) : (
                                    <div>{t('home.Loading...')}</div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeSummaryModal}
                                >
                                    {t('home.Close')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Home.propTypes = {
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }),
    fetchSummary: PropTypes.func.isRequired,
    isLoadingSummary: PropTypes.bool.isRequired,
    isSummaryModalOpen: PropTypes.bool.isRequired,
    summaryData: PropTypes.shape({
        totalInterns: PropTypes.number,
        totalCandidates: PropTypes.number,
        totalRecruitmentSessions: PropTypes.number,
    }),
    closeSummaryModal: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    isLoggedIn : PropTypes.bool.isRequired,
};

export default Home;
