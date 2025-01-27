
import PropTypes from 'prop-types';
import Login from './Login';
 //import Registration from './Registration';

const AuthPage = ({ handleLogin, error, setError }) => (
    <div>
        <h1>Please sign in</h1> {/* Added a heading */}
        <Login handleLogin={handleLogin} error={error} setError={setError} />
        {/*      <Registration />  */}
    </div>
);

AuthPage.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
};

export default AuthPage;