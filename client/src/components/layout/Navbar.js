import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    // <i className="fas fa-user-alt"></i>
    // <i className="fas fa-users"></i>
    // <i className="fas fa-sign-out-alt"></i>
    const loggedInLinks = (
        <ul>
            <li><Link to="/dashboard">{' '}Dashboard</Link></li>
            <li><Link to="/profiles">{' '}Developers</Link></li>
            <li><Link to="/posts">{' '}Posts</Link></li>
            <li><a href='#!' onClick={logout}><span className='hide-sm'>{' '}Logout</span></a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="far fa-handshake"></i>{' '}LinkedDev</Link>
            </h1>
            { isAuthenticated ? loggedInLinks : guestLinks }
        </nav>
    )
}
 
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);