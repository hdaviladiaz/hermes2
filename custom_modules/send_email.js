const nodemailer = require('nodemailer');

var sendEmail = function (to,subject, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hermes.thoughtworks@gmail.com',
            pass: 'hermes12345'
        }
    });

    let mailOptions = {
        from: 'hermes.thoughtworks@gmail.com',
        to: to,
        subject: subject,
        text: "",
        html: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

exports.sendEmail=sendEmail;