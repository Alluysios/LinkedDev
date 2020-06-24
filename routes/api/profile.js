const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const request  = require('request');

// @route   GET api/profile/me
// @desc    Get User Profile
// @access  Private
router.get('/me', authMiddleware.jwtVerify, async (req, res) => {
    try {
        if(!req.user) {
            return res.status(400).json({ msg: 'User profile doesn\'t exist.' })
        }
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
            'name', 'avatar'
        ]);

        if(!profile) {
            return res.status(400).json({ msg: 'User profile doesn\'t exist.'})
        }

        res.json(profile)

    } catch(err) {
        console.log(err)
        res.status(400).json({
            err
        })
    }
})

// @route   PATCH api/profile
// @desc    Update profile
// @access  Private
router.patch('/', 
    [ authMiddleware.jwtVerify, 
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
    ], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { skills } = req.body;
        if(skills) {
            req.body.skills = skills.split(',').map((skill => skill.trim()));
        }
        req.body.user = req.user._id;
        const {
            facebook,
            twitter,
            linkedin,
            youtube,
            instagram
        } = req.body;

        req.body.social = {
            facebook,
            twitter,
            youtube,
            instagram,
            linkedin
        }
        try {
            let profile = await Profile.findOne({ user: req.user._id });
            // Update
            if(profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: req.body }, 
                    { new: true }
                );

                return res.status(200).json({
                    status: 'Updated',
                    profile
                })
            }
        } catch(err) {
            console.log(err);
            res.status(400).json({
                status: 'Created',
                err
            })
        }
    }
);

// @route   POST api/profile
// @desc    Create and Update profile
// @access  Private
router.post('/', 
    [ authMiddleware.jwtVerify, 
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
    ], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { skills } = req.body;
        if(skills) {
            req.body.skills = skills.split(',').map((skill => skill.trim()));
        }
        req.body.user = req.user._id;
        console.log(req.body);
        try {
            const newProfile = await Profile.create(req.body);
            res.status(201).json({
                status: 'Created',
                newProfile
            })
        } catch(err) {
            console.log(err);
            res.status(400).json({
                status: 'Created',
                err
            })
        }
    }
);

// @route   GET api/profile
// @desc    Get All Profiles
// @access  Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get Profile By User Id
// @access  Public
router.get('/user/:userId', async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId}).populate('user', ['name', 'avatar'])
        if(!profile) {
            return res.status(400).json({
                msg: 'No Profile with that ID'
            })
        }

        res.json(profile)
    } catch (err) {
        console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'No Profile with that ID'
            })
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/profile
// @desc    DELETE Profile, User & Posts
// @access  Private
router.delete('/', authMiddleware.jwtVerify, async(req, res) => {
    try {
        // TODO: remove users posts
        await Post.findOneAndDelete({ user: req.user.id})
        // Remove profile
        await Profile.findOneAndDelete({ user: req.user.id })

        //Remove User
        await User.findOneAndDelete({ _id: req.user.id })

        res.status(204).json({
           
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})

// @route   PATCH api/profile/experience
// @desc    ADD PROFILE EXPERIENCE
// @access  Private
router.patch('/experience', [authMiddleware.jwtVerify, 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const { experience } = profile

        experience.unshift(newExp);

        await profile.save();

        res.status(200).json({
            experience
        })
    } catch(err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
});

// @route   DELETE api/profile/experience/:expId
// @desc    DELETE PROFILE EXPERIENCE
// @access  Private

router.delete('/experience/:expId', authMiddleware.jwtVerify, async(req, res) => {
    try {
        await Profile.findOneAndUpdate(
            { user: req.user.id},
            { $pull: { experience: { _id: req.params.expId } } },
            { safe: true }
        );

        const profile = await Profile.findOne({ user:req.user.id })

        res.json(profile)
        
    } catch(err) {
        console.log(err)
    }
})

// @route   PATCH api/profile/education
// @desc    ADD PROFILE EDUCATION
// @access  Private
router.patch('/education', [authMiddleware.jwtVerify, 
    [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const { education } = profile

        education.unshift(newEdu);

        await profile.save();

        res.status(200).json({
            education
        })
    } catch(err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
});

// @route   DELETE api/profile/education/:edId
// @desc    DELETE PROFILE Education
// @access  Private

router.delete('/education/:edId', authMiddleware.jwtVerify, async(req, res) => {
    try {
        await Profile.findOneAndUpdate(
            { user: req.user.id},
            { $pull: { education: { _id: req.params.edId } } },
            { safe: true }
        );

        const profile = await Profile.findOne({ user:req.user.id })

        res.json(profile)
        
    } catch(err) {
        res.status(500).json('Server Error')
    }
})


// @route   GET api/profile/github/:username
// @desc    GET USER REPOS FROM GITHUB
// @access  Public

router.get('/github/:username', async(req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENTID}&client_secret=${process.env.GITHUB_CLIENTSECRET}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if(error) console.error(error);
            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found' })
            }

            res.json(JSON.parse(body));
        });
        
    } catch(err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router;