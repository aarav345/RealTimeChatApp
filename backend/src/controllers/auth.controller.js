const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");   
const userService = require("../services/user.service");
const utils = require("../lib/utils");

module.exports.signup = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;

    try {
        const emailExist = await userModel.findOne({email});
        if (emailExist) res.status(400).json({message: "Email already exists"});

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            fullname,
            email,
            password: hashedPassword
        })

        const token = user.generateAuthToken();
        utils.secureCookieToken(res, token);

        return res.status(201).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            profilePic: user.profilePic
        });

    }

    catch (error) {
        console.log("Error in signup user controller", error);
        res.status(500).json({message: "Something went wrong"});
    }

}



module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email}).select('+password');
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = user.generateAuthToken();
        utils.secureCookieToken(res, token);

        return res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            profilePic: user.profilePic
        });

    }
    catch (error) {
        console.log("Error in login user controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}



module.exports.logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logout successful"});
    }

    catch (error) {
        console.log("Error in logout user controller", error);
        return res.status(500).json({message: "Something went wrong"});
    }
}