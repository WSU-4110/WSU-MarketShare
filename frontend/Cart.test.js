import {jest} from '@jest/globals';
import {Cart} from 'Cart';

jest.mock('firebase/app', () => ({
    firestore: jest.fn(() => ({
        collection: jest.fn(() => ({

            doc: jest.fn(()=> ({
                onSnapshot: jest.fn(),
                update: jest.fn(),
                get: jest.fn(() => ({
                    exists: true,
                    data: jest.fn(() => ({ items: [] })),
                })),
            })),
        })),
        batch: jest.fn(() => ({
            set: jest.fn(),
            update: jest.fn(),
            commit: jest.fn(),
          })),
          FieldValue: {
            serverTimestamp: jest.fn(),
          },
    })),
}));
jest.mock('../backend/auth.js', () => ({
  getCurrentUserAsync: jest.fn(),
}));