import { APIRequestContext, expect } from '@playwright/test';

/**
 * ApiHelper — reusable API utility methods.
 * Use across all API test specs for consistent request handling.
 */
export class ApiHelper {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async get(endpoint: string, headers?: Record<string, string>) {
    const response = await this.request.get(`${this.baseURL}${endpoint}`, { headers });
    return response;
  }

  async post(endpoint: string, body: object, headers?: Record<string, string>) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    return response;
  }

  async put(endpoint: string, body: object, headers?: Record<string, string>) {
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    return response;
  }

  async delete(endpoint: string, headers?: Record<string, string>) {
    const response = await this.request.delete(`${this.baseURL}${endpoint}`, { headers });
    return response;
  }

  // Validate response status
  assertStatus(response: { status: () => number }, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }

  // Validate response time
  assertResponseTime(durationMs: number, thresholdMs: number = 3000) {
    expect(durationMs).toBeLessThan(thresholdMs);
  }

  // Validate JSON schema has required keys
  assertSchema(obj: object, requiredKeys: string[]) {
    requiredKeys.forEach(key => expect(obj).toHaveProperty(key));
  }
}
