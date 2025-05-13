const express = require("express");
const {body} = require("express-validator");
const userController = require("../controllers/auth.controller");  

const router = express.Router();


router.post("/signup", [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body("fullname").isLength({min: 3}).withMessage("Fullname is required"),
], userController.signup);


router.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
], userController.login)



module.exports = router;
