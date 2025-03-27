require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail address
        pass: process.env.EMAIL_PASS   // App password
    }
});

// Form Submission Route
app.post("/mail", (req, res) => {
    const { user_name, user_email, user_message } = req.body;

    const mailOptions = {
        from: user_email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${user_name}`,
        text: `Name: ${user_name}\nEmail: ${user_email}\n\nMessage:\n${user_message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error sending email." });
        }
        res.json({ message: "Email sent successfully!" });
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
