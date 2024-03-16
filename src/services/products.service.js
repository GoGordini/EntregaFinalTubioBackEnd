import { productPath,userPath } from '../utils.js';

import  ProductManagerRepository  from '../repositories/products.repository.js';
import { ProductManager } from '../dao/factory.js';
import {sendEmail} from "../services/mail.services.js";
import  UserManagerRepository  from '../repositories/users.repository.js';
import { UserManager } from '../dao/factory.js';

const userManager= new UserManager(userPath);
const userManagerRepository= new UserManagerRepository(userManager);

const productManager= new ProductManager(productPath);
const productManagerRepository= new ProductManagerRepository(productManager);

export const getProduct= async () => {
    const products = await productManagerRepository.getAllRepository();
    return products;
}

export const getProductById= async (pid) => {
    const product = await productManagerRepository.getProductByIdRepository(pid)
    return product;
}

export const paginateProducts=async(filtered,{sort:sorted,page,limit})=>{
  const result = await productManagerRepository.paginateProductsRepository(filtered,{sort:sorted,page,limit})
  return result;
} 


export const deleteProduct= async (pid) => {
    const product = await productManagerRepository.getProductByIdRepository(pid);
    const user = await userManagerRepository.getUserByEmailRepository(product.owner);
    const result = await productManagerRepository.deleteRepository(pid);
    if (product.owner!="admin" && result.deletedCount==1){
        const deletedProduct = {
             subject: 'Se ha eliminado un producto.',
             html: `<!DOCTYPE html>
             <html lang="es">
             <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>Producto Eliminado</title>
             </head>
             <body>
             
                 <div>               
                    <p>Estimado ${user.name},</p> 
                    <p>Hemos eliminado el producto ${product.title}.</p>
                     <p>Saludos cordiales.</p>
                 </div>        
             </body>
             </html>`
         };
             await sendEmail({
                 to: product.owner,
                 subject: deletedProduct.subject,
                 html: deletedProduct.html})
             }
        return result;
}

export const createProduct= async (product) => {
    const result = await productManagerRepository.saveRepository(product);
    return result;
}

export const updateProduct= async (pid,product) => {
    const result = await productManagerRepository.updateRepository(pid,product);
    return result;
}



