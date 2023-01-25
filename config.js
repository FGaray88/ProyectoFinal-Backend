const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    DB_PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.HOST || "127.0.0.1",
    ADMIN_MAIL: process.env.ADMIN_MAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL,
    ADMIN_PHONE: process.env.ADMIN_PHONE,
    ACCOUNT_SID: process.env.ACCOUNT_SID,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP
    
}