const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    name: String,
    avatar: String,
    likes: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            },
            content: {
                type: String,
                required: true
            },
            name: String,
            avatar: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;