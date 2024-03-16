import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from "mongoose";
import configs from "../../src/config.js";
//await mongoose.connect("mongodb+srv://eleonoratubio:jT0Z0SKpSILu6qvz@cluster0.4gfsjbp.mongodb.net/tests?retryWrites=true&w=majority");
await mongoose.connect(configs.mongoUrl)

//import Users from '../../src/dao/dbManager/users.db.js';
import usersModel from '../../src/dao/dbManager/models/users.model.js';

//let usersDao;
const requester = supertest('http://localhost:8080');

describe('Testing del módulo sessions', () => {
    let cookie;
    after(async () => {
        try {
            await mongoose.connection.collections.users.drop(); 
            mongoose.connection.close()

        } catch (error) {
            console.log(error);
        }
    });
    // before(() => {
    //    const usersDao = new Users();
    // });

    // before(async () => {
    //     try {
    //         await mongoose.connection.collections.users.drop(); 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });


    it('El usuario se debe registrar correctamente', async () => {
       const userMock = {
            first_name: 'Super',
            last_name: 'Test',
            email: 'super@test.com',
            password: '1234',
            age: 22
       };

       const { statusCode } = await requester.post('/api/users/register').send(userMock);
       expect(statusCode).to.be.equal(201);
    });

    it('El usuario se debe poder loguear y se debe retornar una cookie', async () => {
        const credentialsMock = {
            email: 'super@test.com',
            password: '1234'
        };

        const loginResult = await requester.post('/api/users/login').send(credentialsMock);
        const cookieResult = loginResult.headers['set-cookie'][0];
        // 'coderCookieToken=asdhfasdfashjdfgasjdf'
        expect(cookieResult).to.be.ok;

        const cookieResultSplit = cookieResult.split('=');
        // ['coderCookieToken', 'asdhfasdfashjdfgasjdf'];

        cookie = {
            name: cookieResultSplit[0],
            value: cookieResultSplit[1]
        }

        expect(cookie.name).to.be.ok.and.eql('coderCookieToken');
        expect(cookie.value).to.be.ok;
     });

     it('Debemos poder enviar una cookie al servicio current y que se entregue la información del usuario', async () => {
        const { _body } = await requester.get('/api/users/current')
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(_body.payload.email).to.be.eql("super@test.com");
     });
})