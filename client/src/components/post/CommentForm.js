import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

function CommentForm({ addComment, postId }) {
    const [content, setContent] = useState('');

    const onFormSubmit = e => {
        e.preventDefault();
        
        addComment(postId, {content});
        setContent('');
    }

    return (
        <div class="comment-form">
            <div class="bg-primary p">
                <h3>Comment</h3>
            </div>
            <form class="form my-1" onSubmit={e => onFormSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    onChange={e => setContent(e.target.value)}
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)

