const nodeMailer = require('nodemailer');

const {EMAIL, EMAIL_PASS} = require('./serverConfig');

const sender = nodeMailer.createTransport({
    
    service: "Gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
    }
});

module.exports = sender