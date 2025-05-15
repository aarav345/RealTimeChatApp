const express = require("express");
const {body} = require("express-validator");
const userController = require("../controllers/auth.controller");  
const { protectRoute } = require("../middleware/auth.middleware");

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


router.post("/logout", userController.logout);

router.put("/update-profile", protectRoute, userController.updateProfile);

router.get("/check", protectRoute, userController.checkAuth);



module.exports = router;
