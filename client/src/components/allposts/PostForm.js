import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [content, setContent] = useState('');

    const onFormSubmit = e => {
        e.preventDefault();
        
        addPost({content});
        setContent('');
    }
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Say Something...</h3>
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

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
