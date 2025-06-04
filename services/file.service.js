const { v4: uuidv4 } = require("uuid")
const fs = require("fs")
const path = require("path")

class FileService {
    saveCover(file) {
        return this._save(file, "static") // cover rasm static papkaga
    }

    saveFile(file) {
        return this._save(file, "files") // asosiy fayl files papkaga
    }

    _save(file, folderName) {
        try {
            const extension = path.extname(file.name) || ".bin"
            const fileName = uuidv4() + extension
            const currentDir = __dirname
            const targetDir = path.join(currentDir, "..", folderName)
            const filePath = path.join(targetDir, fileName)

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true })
            }

            file.mv(filePath) // fileupload kutubxonasi kerak

            return fileName
        } catch (error) {
            console.error(`Faylni saqlashda xatolik (${folderName}):`, error)
        }
    }
}

module.exports = new FileService()
