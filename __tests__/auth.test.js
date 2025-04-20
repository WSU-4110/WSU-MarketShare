import { jest, describe, expect, test, beforeEach } from '@jest/globals';

// Mock Firebase Auth
const mockAuth = {
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn()
};

jest.unstable_mockModule('firebase/auth', () => mockAuth);

describe('Auth Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCurrentUserAsync', () => {
        test('should return user when logged in', async () => {
            const mockUser = { email: 'test@wayne.edu' };
            mockAuth.onAuthStateChanged.mockImplementation((auth, callback) => {
                callback(mockUser);
                return jest.fn(); // Unsubscribe function
            });

            const { getCurrentUserAsync } = await import('../backend/auth.js');
            const user = await getCurrentUserAsync();
            expect(user).toEqual(mockUser);
        });

        test('should return null when not logged in', async () => {
            mockAuth.onAuthStateChanged.mockImplementation((auth, callback) => {
                callback(null);
                return jest.fn();
            });

            const { getCurrentUserAsync } = await import('../backend/auth.js');
            const user = await getCurrentUserAsync();
            expect(user).toBeNull();
        });
    });

    describe('getIdToken', () => {
        test('should return token when user is logged in', async () => {
            const mockUser = { getIdToken: jest.fn().mockResolvedValue('mock-token') };
            mockAuth.getAuth.mockReturnValue({ currentUser: mockUser });

            const { getIdToken } = await import('../backend/auth.js');
            const token = await getIdToken();
            expect(token).toBe('mock-token');
        });

        test('should return null when user is not logged in', async () => {
            mockAuth.getAuth.mockReturnValue({ currentUser: null });

            const { getIdToken } = await import('../backend/auth.js');
            const token = await getIdToken();
            expect(token).toBeNull();
        });
    });

    describe('getAuthHeaders', () => {
        test('should return headers with token when logged in', async () => {
            const mockUser = { getIdToken: jest.fn().mockResolvedValue('mock-token') };
            mockAuth.getAuth.mockReturnValue({ currentUser: mockUser });

            const { getAuthHeaders } = await import('./auth.js');
            const headers = await getAuthHeaders();
            expect(headers).toEqual({
                Authorization: 'Bearer mock-token'
            });
        });

        test('should return empty object when not logged in', async () => {
            mockAuth.getAuth.mockReturnValue({ currentUser: null });

            const { getAuthHeaders } = await import('../backend/auth.js');
            const headers = await getAuthHeaders();
            expect(headers).toEqual({});
        });
    });
});
