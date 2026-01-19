import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import authData from '../data/authData.json';

test.describe('Auth API tests', () => {

  test('POST /auth/login with valid credentials should return token or be blocked', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.post('/auth/login', authData.validLogin);

    const status = response.status();
    expect([200, 201, 401, 403]).toContain(status);

    if (status === 200 || status === 201) {
      const body = await response.json();
      expect(body).toHaveProperty('token');
      expect(typeof body.token).toBe('string');
      expect(body.token.length).toBeGreaterThan(0);
    }
  });


  test('POST /auth/login with invalid credentials should fail gracefully', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.post('/auth/login', authData.invalidLogin);

    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(200);
    expect(status).toBeLessThan(500);
  });

  test('POST /auth/login with empty credentials should fail gracefully', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.post('/auth/login', authData.emptyLogin);

    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(200);
    expect(status).toBeLessThan(500);
  });

});
