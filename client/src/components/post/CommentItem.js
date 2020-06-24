import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
    postId, deleteComment, comment: { content, name, avatar, user, date, _id }, auth
}) => {
    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                <img
                    class="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>J{name}</h4>
                </Link>
            </div>
            <div>
                <p class="my-1">
                {content}
                </p>
                <p class="post-date">
                    Posted on <Moment format='YYYY/DD/MM'>{date}</Moment>
                </p>
                {
                    !auth.loading && user === auth.user._id && (
                        <button className='btn btn-danger' onClick={e => deleteComment(postId, _id)}>delete</button>
                    )
                }
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)

