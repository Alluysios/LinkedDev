const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    company: String,
    website: String,
    location: String,

    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: String,
    githubusername: String,
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            location: String,
            company: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: Date,
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        instagram: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile