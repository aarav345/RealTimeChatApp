const messageModel = require("../models/message.model");

module.exports.createMessage = async ({
    senderID, receiverID, text, imageURL
}) => {
    if (!senderID || !receiverID) {
        throw new Error("No sender or receiver ID");
    }
    const message = await messageModel.create({
        senderID,
        receiverID,
        text,
        image: imageURL
    })

    return message;
}