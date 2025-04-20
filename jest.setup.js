require('@testing-library/jest-dom');

// Mock Firebase App
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(() => ({ name: 'mockApp' })), // Ensure getApp returns a mock app
}));

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})), // Provide a mock Firestore instance
  collection: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({ docs: [] }), // Mock getDocs to return an empty array
  query: jest.fn(),
  where: jest.fn(),
}));;