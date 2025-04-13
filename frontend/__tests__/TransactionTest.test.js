import { jest } from '@jest/globals';
import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    getDocs, 
    query, 
    where, 
    addDoc, 
    serverTimestamp 
} from 'firebase/firestore';

// Mock Firebase
jest.mock('firebase/app', () => ({
    initializeApp: jest.fn()
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    addDoc: jest.fn(),
    serverTimestamp: jest.fn()
}));

describe('Transaction Tests', () => {
    let mockDb;
    
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        
        // Setup mock DB
        mockDb = {};
        getFirestore.mockReturnValue(mockDb);
        
        // Mock serverTimestamp
        serverTimestamp.mockReturnValue(new Date());
        
        // Setup DOM elements for tests
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

        const mockDocRef = { id: 'transaction123' };
        addDoc.mockResolvedValueOnce(mockDocRef);

        const result = await addTransaction(mockTransactionData);

        expect(addDoc).toHaveBeenCalled();
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

        const mockProducts = [{
            data: () => ({
                ProductID: 'prod123',
                ProductName: 'Test Product',
                Category: 'Electronics',
                Price: 99.99,
                ImageURL: 'test.jpg'
            })
        }];

        // Mock query responses
        getDocs
            .mockResolvedValueOnce({ empty: false, docs: mockTransactions })
            .mockResolvedValueOnce({ empty: false, docs: mockProducts });

        await fetchAndDisplayTransactionHistory('1234');

        const container = document.getElementById('transaction-container');
        expect(container.innerHTML).toContain('Test Product');
        expect(container.innerHTML).toContain('Electronics');
        expect(container.innerHTML).toContain('99.99');
    });

    test('fetchAndDisplayTransactionHistory should handle empty results', async () => {
        getDocs.mockResolvedValueOnce({ empty: true, docs: [] });

        await fetchAndDisplayTransactionHistory('1234');

        const container = document.getElementById('transaction-container');
        expect(container.innerHTML).toBe('<p>No transactions found.</p>');
    });

    test('fetchAndDisplayTransactionHistory should handle errors', async () => {
        getDocs.mockRejectedValueOnce(new Error('Firebase error'));

        await fetchAndDisplayTransactionHistory('1234');

        const container = document.getElementById('transaction-container');
        expect(container.innerHTML).toBe('<p>Failed to load transactions.</p>');
    });
});