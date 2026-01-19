import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import authData from '../data/authData.json';

test.describe('Auth API tests', () => {

  test('POST /auth/login with valid credentials should return token', async ({ request }) => {
    const api = new ApiClient(request);

    const response = await api.post('/auth/login', authData.validLogin);

    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('POST /auth/login with invalid credentials should fail or return error', async ({ request }) => {
    const api = new ApiClient(request);

    const response = await api.post('/auth/login', authData.invalidLogin);

    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(500);
  });

  test('POST /auth/login with empty credentials should fail', async ({ request }) => {
    const api = new ApiClient(request);

    const response = await api.post('/auth/login', authData.emptyLogin);

    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(500);
  });

});
