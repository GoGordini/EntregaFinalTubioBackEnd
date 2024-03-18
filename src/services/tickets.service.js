import  TicketManagerRepository  from '../repositories/tickets.repository.js';
import { TicketManager } from '../dao/factory.js';
import {sendEmail} from "../services/mail.services.js" 
const ticketManager = new TicketManager();
const ticketManagerRepository= new TicketManagerRepository(ticketManager);

//const orderNumber = Date.now() + Math.floor(Math.random() * 100000 + 1);
   export const ticketService = async (user,totalPrice)=>{
   const ticket ={
        "code": Date.now() + Math.floor(Math.random() * 100000 + 1),
        "purchase_datetime": new Date(),
        "amount":totalPrice,
        "purchaser": user.email
    }
    const result = await ticketManagerRepository.saveRepository(ticket);
    const purchaseEmail = {
        subject: 'Gracias por su compra en Happy Skin!',
        html: `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Producto Eliminado</title>
        </head>
        <body>
        
            <div>               
               <p>Estimado ${user.first_name},</p> 
               <p>Gracias por su compra por $ ${totalPrice}.</p>
                <p>Saludos cordiales,</p>
                <p>Happy Skin. </p>
            </div>        
        </body>
        </html>`
    };
        await sendEmail({
            to: user.email,
            subject: purchaseEmail.subject,
            html: purchaseEmail.html})
        
    return result;
}
