const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    // email and userName must be unique
    email: {
        type: String,
        index: {unique: true}
    },
    password: String,
    name: {
        type: String,
        index: {unique: true}
    },
    firstName: String,
    lastName: String,
    birthDate: String,
    profession: String,
    companyName: String,
    city: String,
    country: String,
    registerDate: { type: Date, default: Date.now },
    profilePictureLink: String,
    profileCover: String,
    admin: { type: Boolean, default: false },
    banned: { type: Boolean, default: false},
    moderator: { type: Boolean, default: false },
    liked: {type: Array, default: []},
    time: { type: Date, default: Date.now }
});

// compare the password from the request to the password in the database
UserSchema.methods.comparePasswordLogin = function comparePasswordLogin(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

// pre-signup
UserSchema.pre('save', function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) return next();


    // generate random salt
    return bcrypt.genSalt((saltError, salt) => {

        // error
        if (saltError) {
            return next(saltError);
        }

        // hash password with the salt
        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            // error
            if (hashError) {
                return next(hashError);
            }

            // save the hashed password
            user.password = hash;

            return next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
