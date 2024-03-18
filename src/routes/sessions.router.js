//Solo para Github. Con ruta api/users/ no anda el callback.

import { Router } from 'express';
import passport from 'passport';
import {passportStrategiesEnum,accessRolesEnum} from "../config/enums.js";
import { config } from 'dotenv';
import {github,githubCb} from "../controllers/users.controller.js"
import { generateToken,authorization} from '../utils.js';

const router = Router();

router.get('/github', passport.authenticate(passportStrategiesEnum.GITHUB, {scope: ['user:email']}), github); 

router.get('/github-callback', passport.authenticate(passportStrategiesEnum.GITHUB, { failureRedirect: '/login' }), githubCb);


export default router;