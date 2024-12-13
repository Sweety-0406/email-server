// import nodemailer from "nodemailer"
// import {ImapFlow} from "imapflow"
// import dotenv from 'dotenv';
// dotenv.config();


// export const smtpTranspoter = nodemailer.createTransport({   
//     host:"smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth:{
//         // user: "kiyaranandi02@gmail.com",
//         // pass: "nandikiyara20"
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//     }
// })


// export const imapClient = new ImapFlow({
//     host:'imap.gmail.com',
//     port:993,
//     secure: true,
//     auth:{
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//     }
// })


import nodemailer from "nodemailer"
import {ImapFlow} from "imapflow"
import imaps from 'imap-simple';
import dotenv from 'dotenv';
dotenv.config();


export const smtpTranspoter = nodemailer.createTransport({   
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        // user: "kiyaranandi02@gmail.com",
        // pass: "nandikiyara20"
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})


export const config = {
    imap: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: {
            rejectUnauthorized: true, 
        },
        authTimeout: 10000,
    },
};


