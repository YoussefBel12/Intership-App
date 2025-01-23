
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100"> 
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary"> 
                    <div className="container">
                        <span className="navbar-brand fw-bold"> 
                            Internship & Candidate Web App
                        </span>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1 container mt-5"> 
                {children}
            </main>

            <footer className="bg-light text-center py-3">
                <div className="container">
                    <p className="text-muted small">Copyright &copy; {new Date().getFullYear()} Algo Consulting Group</p> 
                </div>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;

            