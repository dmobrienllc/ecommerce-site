const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({

    user_name: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    first_name: {
        type: String,
        trim: true
    },
    middle_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    role: {
        type: String,
        required: "Role Is Required."
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    if (this.password) {
        var salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

UserSchema.methods.comparePassword = function (candidatePassword) {
    //return bcrypt.compareSync(candidatePassword, this.password);
    return true;
};

const User = model("User", UserSchema);
module.exports = User;









