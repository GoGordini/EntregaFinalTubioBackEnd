import usersModel from "../dao/dbManager/models/users.model.js";
import {getUserCurrent as getUserCurrentService, getUserById as getUserByIdService, updatePremiumStatus as updatePremiumStatusService, uploadDocuments as uploadDocumentsService, getAllUsers as getAllUsersService, deleteAllUsers as deleteAllUsersService,deleteOneUser as deleteOneUserService} from "../services/users.service.js";

export const getUserCurrent= async (req, res) => {
    try{
    const email=req.user.email;
    const user = await getUserCurrentService(email);
    return res.status(200).send({status: "success", payload:user})}
    catch(error) {return res.send({ status: 'error', error: error })}
}

export const getAllUsers = async (req,res)=>{
    try{
        const result=await getAllUsersService();
        return res.send({status:"success",payload:result});
    }
    catch(error){res.status(500).send({error:error.message})}
}

export const updatePremiumStatus= async (req, res) => {
    try{
    const {uid} =req.params;
    const user = await getUserByIdService(uid);
    if (!user){
        return res.status(404).send({status:"error",message:"User not found"})
    }
    if (user.role=="admin"){
        return res.status(404).send({status:"error",message:"User is Admin"})
    }
    const role = (user.role=="user")? ("premium") : ("user");
    const result = await updatePremiumStatusService(uid,role);
    if (result =="Documents missing"){
        return res.status(404).send({status:"error",message:"Documents missing. Cannot update to premium."})
    }
    return res.status(200).send({status: "success", payload:result})}
    catch(error) {res.status(500).send({error:error.message})}
}

export const uploadDocuments = async (req,res) =>{
    try{
        const {uid,folderName} =req.params;
        const user = await getUserByIdService(uid);
        if (!user){
            return res.status(404).send({status:"error",message:"User not found"})
    }
        if(!req.files) return res.status(500).send({ status: 'error', error: 'No files uploaded' });
        const userDocs=[];
        req.files.forEach(file => {
            const docs={};
            docs.name = `${file.originalname}`
            docs.reference = `http://localhost:8080/documents/${file.filename}`;
            userDocs.push(docs);
        });
        const result = await uploadDocumentsService(uid,userDocs);
        return res.status(200).send({status: "success", payload:result})}
    catch(error) {res.status(500).send({error:error.message})}
}

export const deleteAllUsers = async (req,res) =>{
 try{
    const result = await deleteAllUsersService();
    res.send({status: "success", payload:result})}
 catch(error){res.status(500).send({error:error.message})
 }   
}
 export const deleteOneUser = async (req,res) =>{
    try{
        const uid=req.params.uid;
        const user = await getUserByIdService(uid);
        if (!user){
            return res.status(404).send({status:"error",message:"User not found"})};
        const result = await deleteOneUserService(uid);
        res.send({status: "success", payload:result})}
        catch(error){res.status(500).send({error:error.message})}
 }