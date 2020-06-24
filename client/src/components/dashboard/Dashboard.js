import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profiles';
import { Link } from 'react-router-dom';
import DashboardLinks from './DashboardLinks';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return loading && profile === null ? <Spinner /> : (<Fragment>
        <h1 className='large text-primary'> Dashboard </h1>
        <p className='lead'><i className='fas fa-user'></i> Welcome { user && user.name }</p>
        {profile !== null ? 
            (<Fragment>
                <DashboardLinks />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className='my-2'>
                    <button className='btn btn-danger' onClick={() => deleteAccount()}><i className='fas fa-user-minus'></i> Delete My Account</button>
                </div>
                
            </Fragment>)
            :(
            <Fragment>
                <Link to='/create-profile' className='btn btn-primary'>Create Profile </Link>
            </Fragment>)}
    </Fragment>)
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
