const mockFirestore = {
    getFirestore: jest.fn(() => ({
        type: 'firestore-mock'
    })),
    collection: jest.fn(() => ({
        type: 'collection-mock'
    })),
    addDoc: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(col => col),
    where: jest.fn(),
    serverTimestamp: jest.fn(() => 'mockTimestamp')
};

jest.mock('firebase/firestore', () => mockFirestore);

const mockAuth = {
    getCurrentUserAsync: jest.fn(),
    auth: { currentUser: null }
};

jest.mock('../backend/auth.js', () => mockAuth);

describe('Transaction Tests', () => {
    let transactionModule;

    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '<div id="transaction-container"></div>';
        
        mockAuth.getCurrentUserAsync.mockResolvedValue({ uid: '1234' });
        
        mockFirestore.collection.mockReturnValue({
            type: 'collection-mock'
        });
        mockFirestore.query.mockImplementation(col => col);
        mockFirestore.where.mockReturnValue({
            type: 'where-mock'
        });

        jest.isolateModules(() => {
            transactionModule = require('../frontend/TransactionTest.js');
        });
    });

    describe('addTransaction', () => {
        test('should successfully add a transaction', async () => {
            const mockTransactionData = {
                BuyerID: '1234',
                ProductID: 'prod123',
                SellerName: 'John Doe'
            };

            mockFirestore.addDoc.mockResolvedValueOnce({ id: 'transaction123' });

            const result = await transactionModule.addTransaction(mockTransactionData);

            expect(mockFirestore.addDoc).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({
                    ...mockTransactionData,
                    createdAt: 'mockTimestamp'
                })
            );
            expect(result).toEqual({
                success: true,
                transactionId: 'transaction123'
            });
        });

        test('should handle errors when adding transaction', async () => {
            mockFirestore.addDoc.mockRejectedValueOnce(new Error('Firebase error'));

            const result = await transactionModule.addTransaction({});

            expect(result).toEqual({
                success: false,
                error: 'Firebase error'
            });
        });
    });

    describe('fetchAndDisplayTransactionHistory', () => {
        test('should display transactions when data exists', async () => {
            const mockDocs = [{
                data: () => ({
                    BuyerID: '1234',
                    ProductID: 'prod123',
                    SellerName: 'John Doe'
                })
            }];

            mockFirestore.getDocs.mockResolvedValueOnce({
                empty: false,
                docs: mockDocs
            });

            await transactionModule.fetchAndDisplayTransactionHistory('1234');

            const container = document.getElementById('transaction-container');
            expect(container.innerHTML).toContain('John Doe');
            expect(container.innerHTML).toContain('prod123');
        });

        test('should handle empty results', async () => {
            mockFirestore.getDocs.mockResolvedValueOnce({
                empty: true,
                docs: []
            });

            await transactionModule.fetchAndDisplayTransactionHistory('1234');

            const container = document.getElementById('transaction-container');
            expect(container.innerHTML).toBe('<p>No transactions found.</p>');
        });

        test('should handle errors', async () => {
            mockFirestore.getDocs.mockRejectedValueOnce(new Error('Firebase error'));

            await transactionModule.fetchAndDisplayTransactionHistory('1234');

            const container = document.getElementById('transaction-container');
            expect(container.innerHTML).toBe('<p>Failed to load transactions.</p>');
        });
    });
});