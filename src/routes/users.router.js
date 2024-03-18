import { Router } from 'express';
import passport from 'passport';
import {passportStrategiesEnum,accessRolesEnum} from "../config/enums.js";
import { authorization,uploader} from '../utils.js';
import {passportCall} from "../config/passport.config.js";
import {getUserCurrent,updatePremiumStatus,uploadDocuments,getAllUsers,deleteAllUsers,deleteOneUser,logout,failedLogin, failedRegister,register,logIn,restore,reset} from "../controllers/users.controller.js";
import usersModel from '../dao/dbManager/models/users.model.js';
const router = Router();


router.post("/register",passport.authenticate(passportStrategiesEnum.REGISTER,{failureRedirect: "fail-register"}), register) 

router.get('/fail-register', failedRegister);

router.get("/",getAllUsers);

router.delete("/",authorization(accessRolesEnum.ADMIN),deleteAllUsers);

router.delete("/:uid",authorization(accessRolesEnum.ADMIN),deleteOneUser);

router.post('/login', passport.authenticate(passportStrategiesEnum.LOGIN, { failureRedirect: 'fail-login' }),logIn);

router.get('/current', passportCall("jwt"), authorization([accessRolesEnum.ADMIN]),getUserCurrent);

router.get('/fail-login', failedLogin);

router.get('/logout', logout);

router.put('/premium/:uid', updatePremiumStatus);

router.post('/:uid/documents/:folderName',uploader.array("userDocs",3), uploadDocuments);

router.post("/restore",restore)

router.put("/reset",reset)

export default router;
