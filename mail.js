const nodemailer = require("nodemailer");

module.exports = {
    sendMail: function () {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:"akashdeepdas321@gmail.com",
                pass: "@hsakA321#",
            },
        });
    },
};