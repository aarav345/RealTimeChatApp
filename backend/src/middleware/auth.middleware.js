const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");


module.exports.protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        if (!decoded) {
            return res.status(401).json({message: "Unauthorized - Invalid Token"})
        }
    
        const user = userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
    
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({message: "Unauthorized - Invalid Token"})
    }
}