import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

//Es la única ruta pública, todas las otras requieren loguearse y tener permisos.
describe('Testing del módulo products', () => {
    it('GET de /api/products debe enviar una respuesta con los campos status y payload. Además, payload debe ser un arreglo', async () => {
        const { statusCode, _body} = await requester.get('/api/products');
        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('status');
        expect(_body).to.have.property('payload');
        expect(Array.isArray(_body.payload)).to.be.eql(true);
    })

  
})