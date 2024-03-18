import {getUserCurrent as getUserCurrentService, getUserById as getUserByIdService, updatePremiumStatus as updatePremiumStatusService, uploadDocuments as uploadDocumentsService, getAllUsers as getAllUsersService, deleteAllUsers as deleteAllUsersService,deleteOneUser as deleteOneUserService,sendReset as sendResetService,resetPassword as resetPasswordService} from "../services/users.service.js";
import {generateToken} from "../utils.js";
import { config } from 'dotenv';

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

export const logout = async (req, res) => {
    res.clearCookie("coderCookieToken").redirect('/login');
    }

export const failedLogin = async (req, res) => {
        res.status(500).send({ status: 'error', message: 'login fail' });
    }

export const failedRegister = async (req, res) => {
        res.status(500).send({ status: 'error', message: 'register fail' });
    }

export const register = async (req, res) => {
    res.status(201).send({ status: 'success', message: 'user registered' })}

export const logIn = async (req, res) => {
        if(!req.user) { 
            return res.status(401).send({ status: 'error', message: 'invalid credentials' })
        }
        req.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            cart: req.user.cart,
            isAdmin:(req.user.email==config.mailAdmin),
            role: req.user.role,
        }
        const accessToken=generateToken(req.user);
        res.cookie('coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ status: 'success', message: 'login success' })
    }

export const github = async(req, res) => {
        res.send({ status: 'success', message: 'user registered' })}
    
export const githubCb = async(req, res) => { 
        req.newUser=req.user
        req.newUser = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        cart: req.user.cart,
        isAdmin:(req.user.email=="adminCoder@coder.com"),
        role: req.user.role
    }  
        const accessToken=generateToken(req.newUser);
        res.cookie('coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }).redirect('/products');
    }

export const restore = async(req,res)=>{
        try{
            const userEmail=req.body;
            const user = await getUserCurrentService(userEmail.email);
            if (!user){
                return res.status(404).send({status:"error",message:"User not found"})
            }
            req.user = {
                email: user.email,
            }
            const accessToken=generateToken(req.user);
            await sendResetService(req.user.email);                    
            return res.cookie('coderCookieToken', accessToken, { maxAge: 10 * 60 * 1000, httpOnly: true }).send({status:"success",message:"Correo Enviado"});
        }
        catch(error){
            res.status(500).send({error:error.message})
        }
    
    }

export const reset = async(req,res)=>{
    try{
    const { email, password } = req.body;
    const user = await getUserCurrentService(email);
    if (!user){
        return res.status(404).send({status:"error",message:"User not found"})
    }
    const result = await resetPasswordService(user,password);
    if (!result){return res.status(400).send({status:"error",message:"La nueva contraseña debe ser diferente de la anterior"})}
    return res.clearCookie("coderCookieToken").send({status:"success",payload:result})    
    }catch(error){
        res.status(500).send({error:error.message})
    };
 }