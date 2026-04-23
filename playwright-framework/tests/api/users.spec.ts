import { test, expect } from '@playwright/test';

/**
 * API Tests — REST API validation
 * Using JSONPlaceholder (free public test API) as demo
 * Demonstrates: GET, POST, status codes, schema validation, error handling
 */

const BASE_API = 'https://jsonplaceholder.typicode.com';

test.describe('API — Users Endpoint', () => {

  test('TC_API001 — GET /users returns 200 with array of users', async ({ request }) => {
    const response = await request.get(`${BASE_API}/users`);

    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    // Schema validation — check first user has required fields
    const user = users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
  });

  test('TC_API002 — GET /users/:id returns single user', async ({ request }) => {
    const response = await request.get(`${BASE_API}/users/1`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toMatch(/@/);
  });

  test('TC_API003 — GET /users/:id with invalid id returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_API}/users/99999`);
    expect(response.status()).toBe(404);
  });

  test('TC_API004 — POST /posts creates a new post', async ({ request }) => {
    const payload = {
      title: 'QA Automation Best Practices',
      body: 'Shift-left testing and quality engineering transformation.',
      userId: 1,
    };

    const response = await request.post(`${BASE_API}/posts`, { data: payload });

    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created.title).toBe(payload.title);
    expect(created.body).toBe(payload.body);
    expect(created.userId).toBe(payload.userId);
    expect(created.id).toBeTruthy(); // server assigns ID
  });

  test('TC_API005 — Response content-type is application/json', async ({ request }) => {
    const response = await request.get(`${BASE_API}/users`);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('TC_API006 — Response time is within acceptable threshold', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${BASE_API}/users`);
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(3000); // response under 3 seconds
  });

});
