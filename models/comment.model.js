const {model, Schema} = require("mongoose")

const commentSchema = new Schema({
    text: {type: String, required: true},

    message: {type: Schema.Types.ObjectId, ref: "Message"},
    sender: {type:Schema.Types.ObjectId, ref: "User"},
    touser: {type:Schema.Types.ObjectId, ref: "User"},
    
}, {
    timestamps: true
})

module.exports = model("Comment", commentSchema)