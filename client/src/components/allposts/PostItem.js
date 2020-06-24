import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../../actions/post';

const PostItem = ({ likePost, unlikePost, deletePost, auth, post: { _id, content, name, avatar, user, likes, comments, date }, showActions }) => (
        <Fragment>
            <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                {content}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>

                {showActions && (<Fragment>     
                    <button onClick={e => likePost(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i> Like
                    <span>{' '}{likes.length}</span>
                    </button>
                    <button onClick={e => unlikePost(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i> Unlike
                    </button>
                    <Link to={`/post/${_id}`} className="btn btn-primary">
                    Discussion 
                    {
                        comments.length > 0 && (
                            <span className='comment-count'>{comments.length}</span>
                        )
                    }
                    </Link>
                    {!auth.loading && user === auth.user._id && (    
                        <button      
                        onClick={e => deletePost(_id)}
                        type="button"
                        className="btn btn-danger"
                        >
                            delete
                        </button>
                    )}
                </Fragment>)}

                
            </div>
            </div>
        </Fragment>
    )

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(PostItem);
