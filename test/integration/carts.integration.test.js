import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Testing del módulo carts', () => {
    it('POST de /api/carts debe crear un carrito correctamente', async () => {

        const { statusCode, _body } = await requester.post('/api/carts');
        expect(statusCode).to.be.eql(201);
        expect(_body.payload).to.have.property('_id');
    })

    it('POST de /api/carts debe crear un carrito con la propiedad products:[]', async () => {
        const { statusCode, _body } = await requester.post('/api/carts');
        expect(statusCode).to.be.eql(201);
        expect(_body.payload).to.have.property('products');
        expect(_body.payload.products).to.be.eql([]);
    })

    it('GET de /api/carts/:cid debe incluir en la respuesta los campos status y payload. Además, payload debe ser de tipo objeto', async () => {
        const { _body } = await requester.post('/api/carts');
        const id = _body.payload._id
        const responseGet = await requester.get(`/api/carts/${id}`);
        const { statusCode, _body: responseBody } = responseGet;        
        expect(statusCode).to.be.eql(200);
        expect(responseBody).to.have.property('status');
        expect(responseBody).to.have.property('payload');
        expect(responseBody.payload).to.be.an('object');
    })

})