const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{12}$/.test(v); // Validate 12 digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    cnic: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{13}$/.test(v); // Validate 13 digit CNIC number
            },
            message: props => `${props.value} is not a valid CNIC number!`
        }
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Secure the password with bcrypt before saving
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Compare the password
userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        console.log("Error comparing password:", error);
        return false;
    }
};

// Generate JWT token
userSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1h' // Token will expire in 1 hour
            }
        );
    } catch (error) {
        console.log("Error generating token:", error);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
