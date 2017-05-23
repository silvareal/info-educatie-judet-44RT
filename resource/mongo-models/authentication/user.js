const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const UserSchema = new mongoose.Schema({
    //unique email adress
    email: {
        type: String,
        index: {unique: true}
    },
    password: String,
    //unique userName
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
    moderator: { type: Boolean, default: false },
    time: { type: Date, default: Date.now }
});

//Comparing password for login
UserSchema.methods.comparePasswordLogin = function comparePasswordLogin(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) return next();


    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }

            // replace the password string with hash value
            user.password = hash;

            return next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
