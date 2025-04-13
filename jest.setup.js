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
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    addDoc: jest.fn(),
    serverTimestamp: jest.fn()
}));

// Set up test environment
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
    })),
});

// Testing Library setup
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Set up globals
global.jest = jest;
global.expect = expect;
global.window = window;
global.document = document;

// Set up DOM environment
if (typeof window === 'undefined') {
    global.window = {};
}