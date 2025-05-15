const express = require("express");
const {body} = require("express-validator");
const { protectRoute } = require("../middleware/auth.middleware");
const messageController = require("../controllers/message.controller");

const router = express.Router();


router.get("/users", protectRoute, messageController.getUsersForSideBar);
router.get("/:id", protectRoute, messageController.getMessages);
router.post("/send/:id", protectRoute, messageController.sendMessage);



module.exports = router;
