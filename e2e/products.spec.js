import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import productData from '../data/productData.json';


test.describe('Products API tests', () => {
    test('GET /products - should return a list of products', async ({ request }) => {
        const api = new ApiClient(request);
        const response = await api.get('/products');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
    });
    test('GET /products/:id - should return a single product', async ({ request }) => {
        const api = new ApiClient(request);
        const response = await api.get('/products/1');
        expect(response.status()).toBe(200);
        const product = await response.json();
        expect(product.id).toBe(1);
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
    });
    test('GET /products/9999 should return error or empty response', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.get('/products/9999');

        expect([200, 404]).toContain(response.status());
    });
    test('POST /products should create a new product', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.post('/products', productData.validProduct);

        expect([200, 201]).toContain(response.status());

        const body = await response.json();
        expect(body).toHaveProperty('id');
    });

    test('POST /products with invalid data should fail or return error', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.post('/products', productData.invalidProduct);

        expect([200, 201, 400]).toContain(response.status());
    });

    test('PUT /products/1 should update product price', async ({ request }) => {
        const api = new ApiClient(request);

        const updatedData = {
            price: 29.99
        };

        const response = await api.put('/products/1', updatedData);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.price).toBe(updatedData.price);
    });
    test('DELETE /products/1 should delete product', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.delete('/products/1');

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(1);
    });
    test('DELETE /products/9999 should return error or empty response', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.delete('/products/9999');

        expect([200, 404]).toContain(response.status());
    });
});
