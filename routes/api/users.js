const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route POST api/users
const signToken = (id, res) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please provide password with 6 or more character').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        })
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) {
            res.status(400).json({ errors: [{ msg: 'User already exist '}] })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        const newUser = await User.create({
            name,
            email,
            password,
            avatar
        });

        const token = signToken(newUser._id, res);

        res.status(201).json({
            status: 'success',
            token,
            newUser
        })
    } catch(err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
    
})

module.exports = router;