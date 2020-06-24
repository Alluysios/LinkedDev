const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.jwtVerify = async (req, res, next) => {
    // Get token from header
    let token;
    if(req.header('x-auth-token')) {
        token = req.header('x-auth-token')
    }
    
    if(req.header('Authorization')) {
        token = req.header('Authorization').split(' ')[1];
    }
    
    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let currentUser = await User.findById(decoded.id);

        req.user = currentUser;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({ msg: 'Invalid Token' })
    }
}

exports.onlyFor = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({ msg: 'You don\'t have the permission to perform this action' })
        }
        next();
    }
}