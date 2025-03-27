import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
    let transporter = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10),
        secure: process.env.MAIL_SECURE === 'true', // Convert string to boolean
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
        requireTLS: process.env.MAIL_TLS === 'true', // Convert string to boolean
    });

    let message = {
        from: process.env.MESSAGE_FROM,
        to: process.env.MESSAGE_TO,
        subject: sub,
        text: txt,
    };

    try {
        let info = await transporter.sendMail(message);
        console.log("Email sent: ", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
