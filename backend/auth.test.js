import { describe, expect, test, jest } from '@jest/globals';
import { getCurrentUserAsync, getIdToken, getAuthHeaders } from './auth.js';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
    const mockUser = { 
      email: "test@wayne.edu", 
      getIdToken: jest.fn().mockResolvedValue("mock-token") 
    };
    setTimeout(() => callback(mockUser), 0);
    return jest.fn(); // unsubscribe function
  }),
  signOut: jest.fn()
}));

describe('Auth Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getCurrentUserAsync returns user when logged in', async () => {
    const user = await getCurrentUserAsync();
    expect(user).toBeDefined();
    expect(user.email).toBe("test@wayne.edu");
  });

  test('getIdToken returns valid token', async () => {
    const token = await getIdToken();
    expect(token).toBe("mock-token");
  });

  test('getAuthHeaders returns correct format', async () => {
    const headers = await getAuthHeaders();
    expect(headers).toEqual({ 
      Authorization: "Bearer mock-token" 
    });
  });
});
