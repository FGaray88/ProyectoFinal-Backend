const { ADMIN_MAIL, PASSWORD_EMAIL } = require('../config');
const nodemailer = require("nodemailer");
const { consoleLogger } = require("../logger/logger")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: ADMIN_MAIL,
        pass: PASSWORD_EMAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});




const sendMailNewUser = async (userMail) => {
    try {
        const mailResponse = await transporter.sendMail({
            from: "Server FG-App",
            to: ADMIN_MAIL,
            subject: "Nuevo usuario registrado",
            text: `El usuario ${userMail} se ha registrado`
        });
        consoleLogger.info(mailResponse)
    }
    catch (error) {
        consoleLogger.error(error.message);
    }
}


const sendMailNewSelling = async (userData, cart) => {
    try {
        const mailResponse = await transporter.sendMail({
            from: "Server FG-App",
            to: ADMIN_MAIL,
            subject: `Confirmacion de venta de ${userData.username}`,
            text: JSON.stringify(cart.productos)
        });
        consoleLogger.info(mailResponse);
    }
    catch (error) {
        consoleLogger.error(error.message);
    }
}

module.exports = {
    sendMailNewSelling,
    sendMailNewUser
};



