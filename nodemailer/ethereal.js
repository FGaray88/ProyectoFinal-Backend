const nodemailer = require("nodemailer");
const TEST_MAIL = "sigmund.swift82@ethereal.email"
const PASSWORD = "We5E6Qg9WPDNAaXGU9"
const { consoleLogger } = require("../logger/logger")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailPayload = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Mail de prueba desde node.js",
    html: "<h1 style='color: teal;'>Contenido de prueba desde <span style='color: coral;'>Node.js con nodemailer</span></h1>"
};

const sendMail = async (userMail) => {
    try{
        const mailResponse = await transporter.sendMail({
            from: "Server FG-App",
            to: TEST_MAIL,
            subject: "Nuevo usuario registrado",
            text: `El usuario ${userMail} se ha registrado`
        });
        consoleLogger.info(mailResponse)
    }
    catch(error){
        consoleLogger.error(error.message);
    }
}

const sendMailVenta = async (userData, cart) => {
    try {
        const mailResponse = await transporter.sendMail({
            from: "Server FG-App",
            to: TEST_MAIL,
            subject: `Confirmacion de venta de ${userData.username}`,
            text: JSON.stringify(cart.productos)
        });
        consoleLogger.info(mailResponse)
    }
    catch (error) {
        consoleLogger.error(error.message);
    }
}

module.exports = {
    sendMail,
    sendMailVenta
};

