// const nodemailer = require("nodemailer");

// const sendEmail = async options => {

//     let testAccount = await nodemailer.createTestAccount();

//     // 1.) Create a transporter
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         auth: {
//             user: 'jeanne.stamm90@ethereal.email',
//             pass: 'kQn4d8BRhceS5vN55T',
//         }
//     });

//     // 2.) Define the email options
//     const mailOptions = {
//         from: 'Aniruddha Das <foo@example.com>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     };

//     // // 3.) Actually send the email
//     await transporter.sendMail(mailOptions);
// }


// module.exports = sendEmail;






const nodemailer = require("nodemailer");

exports.genarateOTP = (otp_length = 6) => {
    // generate 6 digits OTP.
    let OTP = '';
    for (let i = 0; i < otp_length; i++) {
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal;
    }

    return OTP;
};


exports.sendEmail = async (options) => {

    // 1.) Create a transporter
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: '3dbf34776ae0e8',
            pass: 'ce70fc507668c7',
        }
    });

    // 2.) Define the email options
    const mailOptions = {
        from: 'Aniruddha Das <foo@example.com>',
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    // 3.) Actually send the email
    await transporter.sendMail(mailOptions);
}


