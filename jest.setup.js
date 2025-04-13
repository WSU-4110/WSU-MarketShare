import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock Firebase Auth
const mockFirebaseAuth = {
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn()
};

jest.mock('firebase/auth', () => mockFirebaseAuth);

// Set up globals
global.jest = jest;
global.expect = expect;
global.window = window;
global.document = document;