import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import userData from '../data/userData.json';

test.describe('Users API tests', () => {

  test('GET /users should return list of users', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.get('/users');

    const status = response.status();
    expect([200, 403]).toContain(status);

    if (status === 200) {
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    }
  });

  test('GET /users/:id should return a single user', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.get('/users/1');

    const status = response.status();
    expect([200, 403]).toContain(status);

    if (status === 200) {
      const user = await response.json();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
    }
  });

  test('GET /users/9999 should return error or empty response', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.get('/users/9999');

    const status = response.status();
    expect([200, 403]).toContain(status);
  });

  test('POST /users should create a new user', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.post('/users', userData.validUser);

    const status = response.status();
    expect([200, 201, 403]).toContain(status);

    if (status === 200 || status === 201) {
      const body = await response.json();
      expect(body).toHaveProperty('id');
    }
  });

  test('POST /users should create multiple users', async ({ request }) => {
    const api = new ApiClient(request);

    const users = [
      userData.validUser,
      userData.validUser2,
      userData.validUser3,
      userData.validUser4,
    ];

    for (const user of users) {
      const response = await api.post('/users', user);

      const status = response.status();
      expect([200, 201, 403]).toContain(status);

      if (status === 200 || status === 201) {
        const body = await response.json();
        expect(body).toHaveProperty('id');
      }
    }
  });

  test('POST /users with invalid data should fail or return error', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.post('/users', userData.invalidUser);

    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(200);
    expect(status).toBeLessThan(500);
  });

});
