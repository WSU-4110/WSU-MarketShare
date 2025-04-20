require('@testing-library/jest-dom');

const mockFirebase = {
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(() => ({ name: 'mockApp' }))
};

const mockFirestore = {
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn()
};

jest.mock('firebase/app', () => mockFirebase);
jest.mock('firebase/firestore', () => mockFirestore);

global.mockFirebase = mockFirebase;
global.mockFirestore = mockFirestore;