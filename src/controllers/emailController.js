
import { smtpTranspoter, config } from "../config/email.js";
import prisma from "../config/db.js";
import imaps from 'imap-simple';

export const sendEmail = async(req, res)=>{
    const {recipient, subject, body} = req.body;
    const {userId} = req.user;

    try {
        const info = await smtpTranspoter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient,
            subject,
            text:body
        })

        await prisma.emailLog.create({
            data:{
                userId,
                recipient,
                subject,
                body
            }
        })

        res.status(200).json({message: 'Email sent successfuly', info})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Email not send."})
    }
}


export const receiveEmails = async (req, res) => {
    try {
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');

        const searchCriteria = ['ALL'];
        const fetchOptions = { 
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'], // Include the TEXT part for message body
            struct: true 
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        const emails = messages.map(msg => {
            // Extract headers
            const headers = msg.parts.find(part => part.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)').body;

            // Extract message body
            const bodyPart = msg.parts.find(part => part.which === 'TEXT');
            const body = bodyPart ? bodyPart.body : 'No content';

            return {
                from: headers.from,
                to: headers.to,
                subject: headers.subject,
                date: headers.date,
                body
            };
        });

        connection.end();

        console.log('Fetched Emails:', emails);
        res.status(200).json({ emails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve emails" });
    }
};
