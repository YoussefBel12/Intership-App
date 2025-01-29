
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <nav className="navbar navbar-expand-lg shadow-sm">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <i className="bi bi-briefcase-fill me-2"></i>Internship & Candidate Web App
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/home">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1 container mt-5">
                {children}
            </main>

            <footer className="text-center py-3 mt-auto">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-md-start">
                            <p>&copy; {new Date().getFullYear()} Algo Consulting Group</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p>All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
