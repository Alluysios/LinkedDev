const express = require('express');
const router = express.Router();
const { check, validationResult }  = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');


const signToken = (id, res) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

// @route POST api/auth
router.get('/', authMiddleware.jwtVerify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.log(err);
    }
})

// @route   POST api/auth
// @desc    Login user and get token
// @access  public

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user) {
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] })
        }

        // const avatar = gravatar.url(email, {
        //     s: '200',
        //     r: 'pg',
        //     d: 'mm'
        // });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ err: [{ msg: 'Invalid Credentials' }]})
        }

        const token = signToken(user._id, res);

        res.status(200).json({
            status: 'success',
            token,
            user
        })
    } catch(err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
    
})

module.exports = router;