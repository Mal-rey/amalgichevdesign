import 'dotenv/config'; 
import express from 'express';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
app.use(cors({
  origin: 'https://amalgichevdesign.netlify.app'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resender Setup
const resend = new Resend(process.env.RESEND_API_KEY);


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
    try {
        const { Subject, Email, Message } = req.body;

        // Email setup
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: Email,
            subject: Subject,
            text: Message
        });


        res.status(200).json({ 
            message: 'Email Sent! Will Get Back To You',
            data, });
    } catch (err) {
        res.status(500).json({ message: 'Error Sending, Try Again!' });
    }

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));