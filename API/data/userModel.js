const mongoose    = require('mongoose');
const schema      = mongoose.Schema;

let UserSchema = new schema({
    fullname: {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        required: [true, "can't be blank"]

    },
    email: {
        type: String,
        unique: true,
        required: [true, "can't be blank"]
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'User'
});

module.exports = mongoose.model('userModel', UserSchema);