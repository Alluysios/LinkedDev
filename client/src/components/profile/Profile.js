import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profiles'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ match, getProfileById, profile: { profiles, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);

    return (
        <Fragment>
            {profiles === null || loading ? <Spinner /> : 
            <Fragment>
                <Link to='/profiles' className='btn btn-light'>Back to profiles</Link>
                {auth.isAthenticated && auth.loading === false && auth.user._id === profiles.user._id && (
                    <Link to='/edit-profile' className='btn btn-dark'> Edit Profile </Link>
                )}
            </Fragment>}
            <div className='profile-grid my-1'>
                <ProfileTop profile={profiles} />
                <ProfileAbout profile={profiles} />
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {
                        profiles.experience && profiles.experience.length > 0 ? (
                            profiles.experience.map(exp => (
                                <Fragment>
                                    <ProfileExp key={exp._id} experience={exp} />
                                </Fragment>
                            ))
                        )
                        :
                        (
                            <h4> No Experience Added </h4>
                        )
                        
                    }
                </div>
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {
                        profiles.education && profiles.education.length > 0 ? (
                            profiles.education.map(edu => (
                                <Fragment>
                                    <ProfileEducation key={edu._id} education={edu} />
                                </Fragment>
                            ))
                        )
                        :
                        (
                            <h4> No Education Added </h4>
                        )
                        
                    }
                </div>

                {profiles.githubusername && (
                    <ProfileGithub username={profiles.githubusername} />
                )}
            </div>
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);