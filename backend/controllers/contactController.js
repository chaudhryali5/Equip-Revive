import contactModel from "../models/contactSchema.js";
import { sendEmail } from "../config/modeMailerConfig.js";

export const contactUs = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).send({ message: "All fields are required" })
        }
        const contact = new contactModel({
            name: name.trim(),
            email: email.trim(),
            phone: phone ? phone.trim() : '',
            message: message.trim(),
        });

        await contact.save();

        // Send email to admin
        const subject = `New Contact Form Submission from ${name}`;



        // Send to admin (using SENDER_EMAIL as the admin email)
        await sendEmail(process.env.SENDER_EMAIL, subject);

        res.send({ success: true, message: "Message sent successfully" })
    } catch (error) {
        console.log(error)
        res.send({ success: false, message: "Something went wrong" })
    }

}