import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import * as db from './utils/database.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "public/views");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================== ROUTES ==================

// Home
app.get("/", (req, res) => {
    res.render("index", { page: "home" });
});

// About
app.get("/about", (req, res) => {
    res.render("about", { page: "about" });
});

// Projects list
app.get('/projects', async (req, res, next) => {
    try {
        await db.connect();
        const projects = await db.getAllProjects();
        console.log("✅ All Projects:", projects.map(p => p.id)); // Log all project IDs
        res.render("projects", { data: projects }); 
    } catch (error) {
        next(error); 
    }
});

// ✅ Individual project profile page
app.get("/project/:id", async (req, res, next) => {
    const projectId = req.params.id;
    console.log("🔎 Project ID requested:", projectId);

    try {
        await db.connect();
        const project = await db.getProjectById(projectId);
        console.log("✅ Project fetched:", project);

        if (project) {
            res.render("project-profile", { project });
        } else {
            res.status(404).send("Project not found");
        }
    } catch (error) {
        console.error("❌ Error in /project/:id route:", error);
        next(error);
    }
});

// ✅ Test route to confirm EJS view renders correctly
app.get("/test-profile", (req, res) => {
    const dummyProject = {
        project_name: "Test Project",
        img_url: "/images/default.jpg",
        description: "Just a placeholder project to test layout.",
        price: 42.00
    };
    res.render("project-profile", { project: dummyProject });
});

// Contact
app.get("/contact", (req, res) => {
    res.render("contact", { page: "contact" });
});

// Email route
app.post("/mail", async (req, res) => {
    console.log("📨 Mail button clicked");
    console.log("📄 Form Data:", req.body);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        let transporter = nodemailer.createTransport({
            host: process.env.GMAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE === "true", 
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        let mailOptions = {
            from: process.env.MESSAGE_FROM,
            to: process.env.MESSAGE_TO,
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
