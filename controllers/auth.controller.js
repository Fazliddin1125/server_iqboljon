const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const mailService = require("../services/mail.service")
class AuthController{
    async login(req, res, next){
        try {
            const {email, password} = req.body
           
            const user = await userModel.findOne({email})
            if(!user) return res.json({failure: "User not found"})
            
            const isValidPassword = await bcrypt.compare(password, user.password)
            
            if(!isValidPassword) return res.json({failure: "Password is incorrect"})
            
            if (user.isDeleted) return res.json({ failure: `User is deleted at ${user.deletedAt.toLocaleString()}` })
               
                return res.json({user})
            
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next){
        try {
            const {email, password, fullname} = req.body
            const exist_user = await userModel.findOne({email})

            if(exist_user) return res.json({failure: "User already exists"})

            const hashedPassword =  await bcrypt.hash(password, 10)
            const user = await userModel.create({email, password: hashedPassword, fullname})  
           
            const em = await mailService.sendTextMail(email, user._id.toString())
            
            return res.json({user})
        } catch (error) {
            next(error)
        }
    }

    async getCustomer(req, res, next){
        try {
           const customers = await userModel.find({role: "user"}) 
           return res.json({customers})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()