import request from 'supertest'
import mongoose from 'mongoose';
import app from '.';

describe('Controlador de URLs', () => {
    
    it('Debería crear una URL corta y devolver status 201', async () => {
        const response = await request(app)
            .post('/url/shorten')
            .send({
                originalURL: 'https://github.com/CarlosGarcia20'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Url creada con éxito');
        
        expect(response.body.data).toHaveProperty('shortCode'); 
    });

    it('Debería fallar con status 400 si no envío la URL', async () => {
        const response = await request(app)
            .post('/url/shorten')
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch(/obligatoria/i);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});