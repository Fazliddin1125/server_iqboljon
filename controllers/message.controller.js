const commentModel = require("../models/comment.model");
const messageModel = require("../models/message.model");
const fileService = require("../services/file.service");


class MessageController{
    async create(req, res, next) {
    try {
        const file = req.files?.file;
        if (!file) return res.json({ failure: "Fayl topilmadi" });

        const filename = fileService.saveFile(file);

        const data = req.body;

        
        let recipientsArray = [];
        if (data.recipients && typeof data.recipients === 'string') {
            try {
              
                recipientsArray = JSON.parse(data.recipients);

          
                if (!Array.isArray(recipientsArray)) {
                    console.error("Parsiqlangan recipients massiv emas:", recipientsArray);
                    recipientsArray = []; // Xato bo'lsa bo'sh massiv qilib qo'yamiz
                }
            } catch (parseError) {
                console.error("Recipients JSON parsirovka qilishda xato:", parseError);
                recipientsArray = []; // Parsirovka xatosi bo'lsa bo'sh massiv qilib qo'yamiz
            }
        }

        // messageModel.create uchun tayyor ma'lumot ob'ektini yaratish
        const messageDataForCreate = {
            ...data, // req.body'dan boshqa ma'lumotlarni olamiz
            recipients: recipientsArray, // Parsiqlangan recipients massivini qo'shamiz
            file: filename,
            sender: req.user._id
        };
        
        const message = await messageModel.create(messageDataForCreate);

        console.log(message);

        if (message) {
            return res.json({ status: 200 });
        } else {
            return res.json({ status: 201 });
        }
    } catch (error) {
        console.error("Xabar yaratishda umumiy xato:", error);
        next(error);
    }
}


 async getMyMessage(req, res, next){
    try {
        const mymessages = await messageModel.find({sender: req.user._id}).populate("recipients")
        return res.json({messages: mymessages})
    } catch (error) {
        next(error)
    }
 }

  async getMessage(req, res, next){
    try {
        const mymessages = await messageModel.find({recipients: req.user._id}).populate("recipients").populate("sender")
        return res.json({messages: mymessages})
    } catch (error) {
        next(error)
    }
 }
   async getComments(req, res, next){
    try {
        const comments = await commentModel.find({ touser: req.user._id }).populate("sender").populate("message")
        
        return res.json({comments})
    } catch (error) {
        next(error)
    }
 }
// sent: string
// 	recived: string
// 	rejected: string
// 	checked: string
   async getStatistics(req, res, next){
    try {
        const sent = await messageModel.find({ sender: req.user._id }).countDocuments()
        const recived = await messageModel.find({ recipients: req.user._id }).countDocuments()
        const checked = await messageModel.find({ sender: req.user._id, status: "checked" }).countDocuments()
        const rejected = await messageModel.find({ sender: req.user._id, status: "rejected" }).countDocuments()
        
        
        return res.json({statistics: [sent, recived, checked, rejected]})
    } catch (error) {
        next(error)
    }
 }
   async wtireComment(req, res, next){
    try {
        const data = req.body
        
        const comment = await commentModel.create({sender: req.user._id, text: data.comment, message: data.message, touser: data.touser})
        return res.json({status: 200})
    } catch (error) {
        next(error)
    }
 }

    async changeStatus(req, res, next){
    try {
        const data = req.body
        const id = data.messageId
        const status = await messageModel.findByIdAndUpdate(id, {status: data.newstatus})
        return res.json({status: 200})
    } catch (error) {
        next(error)
    }
 }
}

module.exports = new MessageController()