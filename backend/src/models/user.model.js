const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Email must be at least 3 characters long"],
    },
    fullname: {
        type: String,
        required: true,
        minlength: [3, "Fullname must be at least 3 characters long"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    profilePic: {
        type: String,
        default: ""
    },
}, {timestamps: true}
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this._id}, JWT_SECRET, {expiresIn: "7d"});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;