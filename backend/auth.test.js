import { describe, expect, test, jest } from '@jest/globals';
import { getCurrentUserAsync, getIdToken, getAuthHeaders } from './auth.js';

jest.mock("firebase/auth", () => {
  const originalModule = jest.requireActual("firebase/auth");
  return {
    ...originalModule,
    getAuth: jest.fn(() => ({})),
    onAuthStateChanged: jest.fn((auth, callback) => {
      const mockUser = { email: "test@example.com", getIdToken: jest.fn().mockResolvedValue("mock-token") };
      callback(mockUser);
      return () => {}; // unsubscribe function
    }),
    signOut: jest.fn(),
  };
});

describe('Auth Functions', () => {
  test('getCurrentUserAsync returns user when logged in', async () => {
    const mockUser = { email: 'test@wayne.edu' };
   
  });

  it("should return current user via getCurrentUserAsync", async () => {
    const user = await getCurrentUserAsync();
    expect(user).toBeDefined();
    expect(user.email).toBe("test@example.com");
  });

  it("should get ID token", async () => {
    const token = await getIdToken();
    expect(token).toBe("mock-token");
  });

  it("should return Authorization headers", async () => {
    const headers = await getAuthHeaders();
    expect(headers).toEqual({ Authorization: "Bearer mock-token" });
  });
});
