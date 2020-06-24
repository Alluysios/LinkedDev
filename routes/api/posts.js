const express = require('express');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

// @route   POST api/posts
// @desc    Create Post
// @access  Private
router.post('/', [authMiddleware.jwtVerify,
    check('content', 'Content is required').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        req.body.user = req.user.id
        req.body.name = user.name
        req.body.avatar = user.avatar
        const post = await Post.create(req.body)
        res.json(post)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/posts
// @desc    GET User Posts
// @access  Private
router.get('/', authMiddleware.jwtVerify, async(req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });
        if(!posts) {
            return res.status(400).json({
                msg: 'User have no posts'
            })
        }
        res.json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/posts/all
// @desc    GET all posts
// @access  Private
router.get('/all', authMiddleware.jwtVerify, async(req, res) => {
    try {
        const posts = await Post.find();
        if(!posts) {
            return res.status(400).json({
                msg: 'They\'re no post created yet'
            })
        }
        res.json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/posts/:postId
// @desc    GET Post with ID
// @access  Private
router.get('/:postId', authMiddleware.jwtVerify, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if(!post) {
            return res.status(400).json({
                msg: 'Post not found'
            })
        }
        res.json(post)
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'Post not found'
            })
        }
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/posts/:postId
// @desc    DELETE User Post
// @access  Private
router.delete('/:postId', authMiddleware.jwtVerify, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const { user } = post;
        if(user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        await post.remove();

        res.status(204).json({ msg: 'Post removed' })

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/posts/likes/:postId
// @desc    Like a post
// @access  Private
router.put('/like/:postId', authMiddleware.jwtVerify, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        const { likes }  = post;

        if(likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes)
        // Check if the post has already been like
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/posts/unlike/:unlikeId
// @desc    unlike a post
// @access  Private
router.delete('/unlike/:postId', authMiddleware.jwtVerify, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/posts/comment/:commentId
// @desc    Create Comment on a Post
// @access  Private
router.post('/comment/:postId', [authMiddleware.jwtVerify,
    check('content', 'Content is required').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.postId)

        const { comments }  = post;
        req.body.user = req.user.id
        req.body.name = user.name
        req.body.avatar = user.avatar

        comments.unshift(req.body);
        await post.save();

        res.json(post.comments)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/posts/comment/:commentId
// @desc    Delete Comment on a Post
// @access  Private
router.delete('/comment/:postId/:commentId', authMiddleware.jwtVerify, async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Get the post
        const post = await Post.findById(req.params.postId);

        // Get the comment Id
        const comment = post.comments.find(
            comment => comment.id === req.params.commentId
        )
        // check if comment exist
        if(!comment) {
            return res.status(404).json({ msg: 'Comment not found' })
        }

        // check if user owns the comment
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }
        // Get remove index
        const removeIndex = post.comments.map(comment => {
            return comment._id.toString()
        }).indexOf(req.params.commentId.toString())

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


module.exports = router;