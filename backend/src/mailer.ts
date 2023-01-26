var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'dusanpia2022@outlook.com',
        pass: 'piaprojekat2022'
    },
    logger: true,
});

export function send_password(mail, pass) {
    let mailOptions = {
        from: 'dusanpia2022@outlook.com',
        to: mail,
        subject: 'Your new password!',
        text: '<h1>YOUR NEW PASSWORD IS: <b>' + pass + "</b></h1><br><h3>It is valid next 30 minutes</h3>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}