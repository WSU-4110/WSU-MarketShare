import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import { addTransaction, fetchAndDisplayTransactionHistory } from '../TransactionTest.js';

// Mock Firebase modules
const mockFirestore = {
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    addDoc: jest.fn(),
    serverTimestamp: jest.fn()
};

jest.unstable_mockModule('firebase/firestore', () => mockFirestore);

describe('Transaction Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Setup DOM elements
        document.body.innerHTML = `
            <div id="transaction-container"></div>
        `;
    });

    test('addTransaction should successfully add a transaction', async () => {
        const mockTransactionData = {
            BuyerID: '1234',
            ProductID: 'prod123',
            SellerName: 'John Doe'
        };

        mockFirestore.addDoc.mockResolvedValueOnce({ id: 'transaction123' });
        const result = await addTransaction(mockTransactionData);

        expect(mockFirestore.addDoc).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            transactionId: 'transaction123'
        });
    });

    test('fetchAndDisplayTransactionHistory should display transactions', async () => {
        const mockTransactions = [{
            id: 'trans1',
            data: () => ({
                BuyerID: '1234',
                ProductID: 'prod123',
                SellerName: 'John Doe'
            })
        }];

        mockFirestore.getDocs.mockResolvedValueOnce({ docs: mockTransactions });
        await fetchAndDisplayTransactionHistory('1234');

        const container = document.getElementById('transaction-container');
        expect(container).toBeInTheDocument();
        expect(container.innerHTML).toContain('John Doe');
    });
});