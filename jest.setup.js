import { jest, expect } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock Firebase Auth
const mockFirebaseAuth = {
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn()
};

// Mock Firebase modules using dynamic import.meta.jest
import.meta.jest.mock('firebase/auth', () => mockFirebaseAuth);

jest.unstable_mockModule('firebase/app', () => ({
    initializeApp: jest.fn(),
    getApp: jest.fn()
}));

jest.unstable_mockModule('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({})), // Mock Firestore instance
    collection: jest.fn(() => 'mockCollection'), // Mock collection reference
    addDoc: jest.fn(async () => ({ id: 'transaction123' })), // Mock addDoc to resolve with a mock document ID
    serverTimestamp: jest.fn(() => 'mockTimestamp'), // Mock serverTimestamp
    getDocs: jest.fn(async () => ({
        empty: false,
        docs: [{
            data: () => ({
                BuyerID: '1234',
                ProductID: 'prod123',
                SellerName: 'John Doe'
            })
        }]
    })), // Mock getDocs to return a list of documents
    query: jest.fn(), // Mock query
    where: jest.fn() // Mock where
}));

jest.unstable_mockModule('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
        currentUser: {
            getIdToken: jest.fn().mockResolvedValue('mock-token')
        }
    })),
    onAuthStateChanged: jest.fn((auth, callback) => {
        callback({ email: 'test@wayne.edu' });
        return jest.fn(); // Unsubscribe function
    }),
    signOut: jest.fn()
}));

// Mock window if it doesn't exist
if (typeof window === 'undefined') {
    global.window = {};
}

// Mock document if it doesn't exist
if (typeof document === 'undefined') {
    global.document = {
        createElement: jest.fn(() => ({
            appendChild: jest.fn(),
            innerHTML: '',
            classList: { add: jest.fn() }
        })),
        getElementById: jest.fn(id => ({
            appendChild: jest.fn(),
            innerHTML: '',
            classList: { add: jest.fn() }
        }))
    };
}

// Set up matchMedia mock
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }))
});

// Testing Library setup
window.HTMLElement = {
    prototype: {
        scrollIntoView: jest.fn()
    }
};

// Set up globals
global.jest = jest;
global.expect = expect;
global.window = window;
global.document = document;

// Set up DOM environment
if (typeof window === 'undefined') {
    global.window = {};
}