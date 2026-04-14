import 'dotenv/config'; 
import express from 'express';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors({
  origin: 'https://amalgichevdesign.netlify.app'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.GENERATED_PASSWORD
    }
});

// Form Submission Route
app.post('/email', [
    body('Subject').trim().notEmpty().withMessage('This must be a valid subject.'),
    body('Email').isEmail().withMessage('This must be a valid email.'),
    body('Message').trim().notEmpty().withMessage('This must be a valid message.')
], async (req, res) => {

    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    const { Subject, Email, Message } = req.body;

    // Email setup
    const mailSetup = {
        from: Email,
        replyTo: Email,
        to: process.env.MAIL_EMAIL,
        subject: `${Subject}`,
        text: `${Message}`
    };

    // This will be used to send the email
    try {
        await transporter.sendMail(mailSetup);
        res.status(200).json({ message: 'Email Sent! Will Get Back To You' });
    } catch (err) {
        res.status(500).json({ message: 'Error Sending, Try Again!' });
    }

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));