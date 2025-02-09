/*
import PropTypes from 'prop-types';


const CandidateList = ({
   // userData,
    candidates,
    handleDeleteCandidate,
    error,
    toggleCandidateDetails,
    selectedCandidate,

}) => (







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
)


CandidateList.propTypes = {
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }),
    candidates: PropTypes.arrayOf(PropTypes.object).isRequired,
   
    handleDeleteCandidate: PropTypes.func.isRequired,
    error: PropTypes.string,
    


    toggleCandidateDetails: PropTypes.func.isRequired, // Add this line
    selectedCandidate: PropTypes.number, // Add this line

};
export default CandidateList;
*/

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CandidateList = ({
    candidates,
    handleDeleteCandidate,
    error,
    toggleCandidateDetails,
    selectedCandidate,
}) => {
    const { t } = useTranslation();

    return (
        <div className="p-4 rounded-3 shadow" style={{
            background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
            <h2 className="mb-3">{t('candidates')}</h2>
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
                                    <p><strong>{t('email')}:</strong> {candidate.email}</p>
                                    <p><strong>{t('school')}:</strong> {candidate.school}</p>
                                    <p><strong>{t('level')}:</strong> {candidate.level}</p>
                                    <p><strong>{t('date_of_candidature')}:</strong> {candidate.dateCreated}</p>
                                    <p><strong>{t('recruitment_session')}:</strong> {candidate.recruitmentSessionId}</p>
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
                                {t('view_cv')}
                            </a>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteCandidate(candidate.id)}
                            >
                                {t('delete')}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

CandidateList.propTypes = {
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }),
    candidates: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleDeleteCandidate: PropTypes.func.isRequired,
    error: PropTypes.string,
    toggleCandidateDetails: PropTypes.func.isRequired,
    selectedCandidate: PropTypes.number,
};

export default CandidateList;
