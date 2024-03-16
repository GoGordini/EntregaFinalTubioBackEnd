import usersModel from "./models/users.model.js";
import { twoDaysAgo } from "../../utils.js";

export default class Users {
constructor (){
}

getUserByEmail = async (email) => {
    const user = await usersModel.findOne({email}).lean();
    return user;
}

getUserById = async (uid) => {
    const user = await usersModel.findOne({_id:uid}).lean();
    return user;
}

updatePremiumStatus = async (uid,role) =>{
    const user = await usersModel.updateOne({_id:uid},{$set:{role:role}});
    return user;
}

uploadDocuments = async (uid,userDocs) => {
    const result = await usersModel.updateOne({_id:uid},{$set:{documents:userDocs}});
    return result;
}

getAllUsers = async()=>{
    const result = await usersModel.find().select({first_name:1, last_name:1, email:1, role:1, cart:0}).lean();
    return result;
}

deleteAllUsers = async () =>{
    const usersToDelete = await usersModel.find({last_connection:{$lt: twoDaysAgo() }})
    const result = await usersModel.deleteMany({last_connection:{$lt: twoDaysAgo() }})
    return (usersToDelete);
}

deleteOneUser = async (uid)=>{
    const result = await usersModel.deleteOne({_id:uid})
    return (result);
}
save = async (user) => {
const result = await usersModel.create(user);
return result;
}
}