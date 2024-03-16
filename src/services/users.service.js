import { UserManager } from '../dao/factory.js';
import { userPath } from '../utils.js';
import  UserManagerRepository  from '../repositories/users.repository.js';
const userManager = new UserManager(userPath);
const userManagerRepository= new UserManagerRepository(userManager);
import {sendEmail} from "../services/mail.services.js" 

export const getUserCurrent= async (email) => {
    const user = await userManagerRepository.getUserByEmailRepository(email);
    return user;
}

export const getUserById= async (uid) => {
    const user = await userManagerRepository.getUserByIdRepository(uid);
    return user;
}

export const deleteAllUsers= async () => {
    const result = await userManagerRepository.deleteAllUsersRepository();
    const deletedAccount = {
       // to: user.email,
        subject: 'Su cuenta ha sido eliminada por inactividad',
        html: `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cuenta Eliminada</title>
        </head>
        <body>
        
            <div>               
                <p>Hemos eliminado su cuenta porque no ha tenido actividad en las últimas 48 hs.
            </div>        
        </body>
        </html>`
    };
    result.forEach(async(user)=>{
        await sendEmail({
            to: user.email,
            subject: deletedAccount.subject,
            html: deletedAccount.html})
    })
    //if (result.payload.deletedCount==1)
    return result;
}

export const deleteOneUser = async (uid)=>{
    const result = await userManagerRepository.deleteOneUserRepository(uid);
    return result;
}

export const updatePremiumStatus= async (uid,role) => {
    // const user = await userManagerRepository.getUserByIdRepository(uid);
    // if (role==="premium" & user.documents.length<3){
    //     return "Documents missing"
    // }
    const result = await userManagerRepository.updatePremiumStatusRepository(uid,role);
    return result;
}

export const uploadDocuments= async (uid,userDocs) => {
    const result = await userManagerRepository.uploadDocumentsRepository(uid,userDocs);
    return result;
}

export const getAllUsers = async () =>{
    const result = await userManagerRepository.getAllUsersRepository();
    return result;
}