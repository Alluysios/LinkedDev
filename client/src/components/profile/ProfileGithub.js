import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getGithubRepos } from '../../actions/profiles';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
    useEffect(() => {
        getGithubRepos(username)
    }, [getGithubRepos, username])

    return (
        <div className='profile-github'>
            <h2 className='text-primary my-1'> Github Repos </h2>
            {
                repos === null ? (
                    <Spinner />
                ) : (
                    repos.map(repo => (
                        <div key={repo.id} className="repo bg-white p-1 my-1">
                            <div>
                            <h4><a href={repo.html_url} target="_blank"
                                rel="noopener noreferrer">{repo.name}</a></h4>
                            <p>
                                {repo.description}
                            </p>
                            </div>
                            <div>
                            <ul>
                                <li className="badge badge-star">Stars: {repo.stargazers_count}</li>
                                <li className="badge badge-watchers">Watchers: {repo.watchers_count} </li>
                                <li className="badge badge-forks">Forks: {repo.forks_count}</li>
                            </ul>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.object.isRequired,
    username: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub)
