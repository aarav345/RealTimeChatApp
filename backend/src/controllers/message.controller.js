const messageModel = require("../models/message.model");
const userModel = require("../models/user.model");
const cloudinary = require("../lib/cloudinary");
const { createMessage } = require("../services/message.service");

module.exports.getUsersForSideBar = async (req, res, next) => {
    try {
        const loggedInUserID = req.user._id;
        const filteredUsers = await userModel.find({_id: {$ne: loggedInUserID}});
        res.status(200).json(filteredUsers);
    }

    catch (error) {
        console.log("Error in get users for side bar controller", error);
        return res.status(500).json({message: "Something went wrong"});
    }
}

module.exports.getMessages = async (req, res, next) => {
    try {
        const {id:userToChatID} = req.params;
        const myID = req.user._id;

        const messages = await messageModel.find({
            $or: [
                {
                    senderID: myID, 
                    receiverID: userToChatID
                },
                {
                    senderID: userToChatID,
                    receiverID: myID
                }
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in get messages controller", error);
        return res.status(500).json({message: "Something went wrong"});
    }
}


module.exports.sendMessage = async (req, res, next) => {
    try {
        const { text, image } = req.body;
        const { id: receiverID } = req.params;
        const senderID = req.user._id;

        let imageURL;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = await createMessage({
            senderID,
            receiverID,
            text,
            imageURL
        })


        // todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message controller", error);
        return res.status(500).json({message: "Something went wrong"});
    }
}