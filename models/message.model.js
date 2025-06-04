const {model, Schema} = require("mongoose")

const messageSchema = new Schema({
    title: {type: String, required: true},
    comment: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    recipients: [{type:Schema.Types.ObjectId, ref: "User"}],
    status: {type: String, default: "pending"},
    recomment: {type: String},
    file: {type: String}
}, {
    timestamps: true
})

module.exports = model("Message", messageSchema)