// Mock functions
const mockUnsubscribe = jest.fn();
const mockGetAuth = jest.fn();
const mockOnAuthStateChanged = jest.fn();
const mockSignOut = jest.fn();

// Create mock auth instance
const mockAuthInstance = {
    currentUser: null
};

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => mockAuthInstance),
    onAuthStateChanged: mockOnAuthStateChanged,
    signOut: mockSignOut
}));

// Require module under test
const { getCurrentUserAsync, getIdToken, getAuthHeaders } = require('../backend/auth.js');

describe('Auth Functions', () => {
    let mockUser;
    const MOCK_TOKEN = 'mock-token';

    beforeEach(() => {
        jest.clearAllMocks();
        mockUnsubscribe.mockClear();

        // Setup mock user with properly mocked getIdToken
        mockUser = {
            getIdToken: jest.fn().mockResolvedValue(MOCK_TOKEN),
            email: 'test@wayne.edu'
        };

        // Reset mock auth instance
        mockAuthInstance.currentUser = null;
    });

    describe('getCurrentUserAsync', () => {
        test('should return user when logged in', async () => {
            const mockUser = { email: 'test@wayne.edu' };

            mockOnAuthStateChanged.mockImplementation((auth, callback) => {
                setTimeout(() => {
                    callback(mockUser);
                }, 0);
                return mockUnsubscribe;
            });

            const user = await getCurrentUserAsync();
            expect(user).toEqual(mockUser);
            expect(mockUnsubscribe).toHaveBeenCalled();
        });

        test('should return null when not logged in', async () => {
            mockOnAuthStateChanged.mockImplementation((auth, callback) => {
                setTimeout(() => {
                    callback(null);
                }, 0);
                return mockUnsubscribe;
            });

            const user = await getCurrentUserAsync();
            expect(user).toBeNull();
            expect(mockUnsubscribe).toHaveBeenCalled();
        });
    });

    describe('getIdToken', () => {
        test('should return token when user is logged in', async () => {
            // Set the current user on the mock auth instance
            mockAuthInstance.currentUser = mockUser;

            const token = await getIdToken();
            expect(token).toBe(MOCK_TOKEN);
            expect(mockUser.getIdToken).toHaveBeenCalled();
        });

        test('should return null when user is not logged in', async () => {
            // Ensure current user is null
            mockAuthInstance.currentUser = null;

            const token = await getIdToken();
            expect(token).toBeNull();
        });
    });

    describe('getAuthHeaders', () => {
        test('should return headers with token when logged in', async () => {
            // Set the current user on the mock auth instance
            mockAuthInstance.currentUser = mockUser;

            const headers = await getAuthHeaders();
            expect(headers).toEqual({
                Authorization: `Bearer ${MOCK_TOKEN}`
            });
            expect(mockUser.getIdToken).toHaveBeenCalled();
        });

        test('should return empty object when not logged in', async () => {
            // Ensure current user is null
            mockAuthInstance.currentUser = null;

            const headers = await getAuthHeaders();
            expect(headers).toEqual({});
        });
    });
});
