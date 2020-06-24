const express = require('express');

const app = express();
const path = require('path');

const userRouter = require('./routes/api/users');
const postRouter = require('./routes/api/posts');
const profileRouter = require('./routes/api/profile');
const authRouter = require('./routes/api/auth');
const cors = require('cors');

app.use(express.json({ limit: '10kb' }))
app.use(cors());
app.options('*', cors());

// ROUTES
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/profile', profileRouter)
app.use('/api/auth', authRouter)

// SERVE STATIC ASSETS IN PRODUCTION (DEPLOYMENT)
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

module.exports = app;