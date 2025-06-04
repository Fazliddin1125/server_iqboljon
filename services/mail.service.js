const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')


class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		})
	}

	async sendTextMail(email) {
		
		try {
			await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `Assalomu Alaykum`,
			html: `
				<h1>Siz tizimga admin tomonidan muvaffaqiyatli ro'yxatdan o'tkazildingiz!</h1>
				<p>Itimos accountingizni tekshiring!</p>
				
			`,
		})
		return 
		} catch (error) {
			conosole.log(error)
			return
		}
	}


}

module.exports = new MailService()