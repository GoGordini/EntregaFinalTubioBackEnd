import {getProduct as getProductService, paginateProducts as paginateService} from "../services/products.service.js";
import {getCart as getCartService} from "../services/carts.service.js";
import {getChat as getChatService} from "../services/chat.service.js";
import {getUserById as getUserByIdService, getAllUsers as getAllUsersService} from "../services/users.service.js";
import { generateProduct } from "../utils.js";

export const realtimeproducts = async(req,res)=>{
    try{
     const products = await getProductService();
     res.render("realTimeProducts",{products:products});}
     catch(error) {return res.send({ status: 'error', error: error })}
 }

export const mockingProducts= async(req,res)=>{
    try{
        let products = []; 
        for(let i=0; i < 100; i++) {
            products.push(generateProduct());
        }
     res.render("realTimeProducts",{products:products});}
     catch(error) {return res.send({ status: 'error', error: error })}
 }

 export const loggerTests= (req, res) => {
    req.logger.fatal('prueba fatal');
    req.logger.error('prueba error');
    req.logger.warning('prueba warning');
    req.logger.info('prueba info');
    req.logger.http('prueba http');
    req.logger.debug('prueba debug');

    res.send({ result: 'OK' });
}

export const showCart=async(req,res)=>{
    try{
        const cid = req.params.cid;
        const cart = await getCartService(cid);
        res.render("cart",{cart});
    }
    catch(error) {return res.send({ status: 'error', error: error })};
    }

export const getChat=async(req,res)=>{
    const messages = await getChatService();
    res.render("chat",{messages});
}
export const showProducts = async (req,res)=>{
    try{
     const {page=1,limit=6,sort,queryValue,query} = req.query; 
     const filtered = (query=="price"||query=="stock")?({[query]: { $gt: queryValue }}):((queryValue)? {[query]:{$regex: queryValue,$options:"i"}} : {});
     const sorted = sort? ({price:sort}) : ({});
     const {docs,hasPrevPage,hasNextPage,nextPage,prevPage}=await paginateService(filtered,{sort:sorted,page,limit})
     const prevLink=queryValue? `/products?page=${prevPage}&limit=${limit}&queryValue=${queryValue}&query=${query}`:`/products?page=${prevPage}&limit=${limit}`;
     const nextLink = queryValue? `/products?page=${nextPage}&limit=${limit}&queryValue=${queryValue}&query=${query}`:`/products?page=${nextPage}&limit=${limit}`;
        res.render("home",{
            products:docs,
            user:req.user,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            limit,
            query,
            queryValue,
            prevLink,
            nextLink
        });}
        catch(error) {return res.send({ status: 'error', error: error })}
    }

export const reset = (req, res) => {
        res.render('reset')
    }

export const restore = (req, res) => {
        res.render('restore')
    }

export const register = (req, res) => {
        res.render('register')
    }

export const login = (req, res) => {
        res.render('login')
    }

export const getProfile = (req, res) => {
        res.render('profile', {
            user: req.user
        })
    }

export const getUser = async(req,res)=>{
        try{
            const uid = req.params.uid;
            const user= await getUserByIdService(uid);
            if (!user) {return res.status(404).send({status:"error",message:"User not found"})};
            const userIsPremium=(user.role==="premium");
            res.render("users",{users:user,userIsPremium});}
            catch(error) {return res.send({ status: 'error', error: error })}
        }

export const getAllUsers = async(req,res)=>{
    try{
        const users= await getAllUsersService();
        res.render("allUsers",{users:users});}
        catch(error) {return res.send({ status: 'error', error: error })}
    } 