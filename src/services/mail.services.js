import nodemailer from 'nodemailer';
import configs from '../config.js';

const transporter=nodemailer.createTransport({
 	service:"gmail",
 	port: 587, //lo indica gmail
 	auth:{
     user:configs.userNodemailer,
     pass:configs.passwordNodemailer} //sin espacios
 })

export const sendEmail = async (email) => {
    await transporter.sendMail({
        from: 'GordiniApp',
        to: email.to,
        subject: email.subject,
        html:email.html,
        attachments:[]
    });

}