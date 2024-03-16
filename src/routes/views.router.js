import {Router} from "express";
const router = Router();
import { authorization,redirectToReset,redirectToLogin } from '../utils.js';
import {realtimeproducts,mockingProducts,loggerTests,showProducts,showCart,getChat,restore,register,reset,login,getProfile,getUser,getAllUsers} from '../controllers/views.controller.js';

import {accessRolesEnum} from "../config/enums.js";

//RUTAS DE PRODUCTOS
router.get("/realtimeproducts",redirectToLogin,realtimeproducts)

router.get('/mockingproducts',mockingProducts)

router.get("/products",redirectToLogin,showProducts);


//RUTA DE CARRITO
router.get("/carts/:cid",showCart);

//RUTA DE CHAT
router.get("/chat",redirectToLogin,authorization(accessRolesEnum.USER),getChat)

//RUTAS DE USUARIOS
router.get('/register', register);

router.get('/login', login);

router.get('/restore', restore);

router.get('/reset', redirectToReset,reset);

router.get("/users",authorization(accessRolesEnum.ADMIN),getAllUsers)

router.get("/users/:uid",authorization(accessRolesEnum.ADMIN),getUser)
    
router.get('/', redirectToLogin, getProfile);

//OTRAS
router.get('/loggerTest', loggerTests);

export default router;


