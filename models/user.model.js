const {Schema, model } = require("mongoose")

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: "user"},
    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: Date},
    birthday: {type: Date},
    curtomerId: {type: String},
    phone: {type: String},
    isactive: {type: Boolean, default: false}
},
{
    timestamps: true
})

module.exports = model("User", userSchema)