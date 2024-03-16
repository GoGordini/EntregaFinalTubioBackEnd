import { fileURLToPath } from 'url';
import { dirname,join } from 'path';
import bcrypt from "bcrypt";
import configs from "./config.js";
import jwt from 'jsonwebtoken';
import { faker as faker } from '@faker-js/faker';
import path from 'path';
import multer from "multer";
import {subDays} from 'date-fns';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const __mainDirname = path.join(__dirname, '..'); ////asdasd/asdasdasd/asdasd/RecursosBackend-Adoptme
//hace un back

//configuración de Multer
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const folderName=((req.params.folderName=="products")||(req.params.folderName=="profiles"))?(req.params.folderName):("documents")
        const dir = `${__dirname}/public/${folderName}`;
        cb(null,dir) //primer parámetro de callback es que no existe error, segundo el path absoluto)
    },
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

export const uploader= multer({
    storage, onError:(err,next)=>{
        console.log(err.message);
        next();
    }
});

export const productPath = join (__dirname,"./files/productos.json");
export const  cartPath = join (__dirname, "./files/carritos.json")
export const  chatPath = join (__dirname, "./files/chats.json")
export const  userPath = join (__dirname, "./files/users.json")

//1. hashear nuestra contraseña
export const createHash = password => //paso como parámetro password a hashear
        bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //primer parámetro es lo que quiero hashear, segundo el número de rondas de hasheo (se recomienda 10)
    //1234
    //ASDASD435@#$#$

//2. validar nuestro password
export const isValidPassword = (plainPassword, hashedPassword) => //plainpassword es lo que valida el usuario, hashedpassword es lo que ya tenemos guardado hasheado.
    bcrypt.compareSync(plainPassword, hashedPassword);

export const generateToken = (user) => {
        const token = jwt.sign({ user }, configs.privateKeyJWT, { expiresIn: '1h' });
        return token;
    }
//Autenticación primer paso lo hace passport
//req.user = {}
export const authorization = (role) => {
    return async (req, res, next) => {
        if(req.user.role !== role) {
            if (!role.includes(req.user.role)) {return res.status(403).send({ status: 'error', message: 'no permissions' })}}
        next();
    }
}

export const redirectToLogin=(req, res, next)=> {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        // Redirige a la ruta de login si la autenticación falla
        return res.redirect('/login');
      }
      req.user = user;
      return next();
    })(req, res, next);
  }

  export const redirectToReset=(req, res, next)=> {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        // Redirige a la ruta de login si la autenticación falla
        return res.redirect('/restore');
      }
      req.user = user;
      return next();
    })(req, res, next);
  }
export const twoDaysAgo = () =>{
    const today = new Date();
    console.log(today,subDays(today, 2))
    return subDays(today, 2);
}
export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.string.alphanumeric(10),
        category: faker.commerce.department(),
        stock: faker.number.int(1),
        id: faker.database.mongodbObjectId(),
        status: faker.datatype.boolean()
        //role: faker.helpers.arrayElement(['cliente', 'vendedor']), //cliente, vendedor
        
        
    }
}