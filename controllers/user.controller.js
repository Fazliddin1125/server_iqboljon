
const userModel = require("../models/user.model")

class UserContorller{
    async getProfile(req, res, next) {
		try {
			const user = await userModel.findById(req.params.id).select('-password')
			return res.json({ user })
		} catch (error) {
			next(error)
		}
	}
	
	async getUsers(req, res, next) {
		try {
			const users = await userModel.find().select('-password')
			return res.json({ users })
		} catch (error) {
			next(error)
		}
	}

	async deleteUser(req, res, next) {
		try {
			const id = req.params.id
			const users = await userModel.findByIdAndDelete(id)
			return res.json({ status:200 })
		} catch (error) {
			next(error)
		}
	}

	 
}
module.exports = new UserContorller()