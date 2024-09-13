const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS_KEY,
    },
});


const sendEmail = async (receiverEmail, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: "Ikash Dev 👻 'vikashnagar2025@gmail.com", // send address
            to: receiverEmail, // recierver email
            subject: subject, // subject line
            html: html // html body
        })

        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log("Error during send email", error);
        throw Error("Failed to send email!");
    }
}

module.exports =  sendEmail;