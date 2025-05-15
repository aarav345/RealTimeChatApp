const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverID: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
},
{ timestamps: true}
)


const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;