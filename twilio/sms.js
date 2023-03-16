const twilio = require("twilio")
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_PHONE_NUMBER, TWILIO_WHATSAPP, ADMIN_PHONE } = require('../config');
const { consoleLogger } = require("../logger/logger")


const twilioClient = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (phone) => {
    try {
        const messageResponse = await twilioClient.messages.create({
            body: "Su pedido ha sido recibido y se encuentra en proceso",
            from: TWILIO_PHONE_NUMBER,
            to: `+${phone}`
        });
        consoleLogger.info(messageResponse);
    }
    catch (error) {
        consoleLogger.error(error.message);
    }
}

const sendWspMessage = async (phone) => {
    try {
        const messageResponse = await twilioClient.messages.create({
            body: "Su pedido ha sido recibido y se encuentra en proceso",
            from: TWILIO_WHATSAPP,
            to: `whatsapp:+${ADMIN_PHONE}`
        });
        consoleLogger.info(messageResponse);
    }
    catch (error) {
        consoleLogger.error(error.message);
    }
}

module.exports = {
    sendSMS,
    sendWspMessage
};
