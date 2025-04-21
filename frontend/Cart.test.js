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
document.body.innerHTML = `
  <div class="cart-items"></div>
  <div class="subtotal-text"></div>
  <button class="checkout-btn"></button>
  <div id="checkoutModal"></div>
`;

describe('Cart Class', () => {
    let cart;
});
afterEach(() => {
    jest.clearAllMocks();
});

test('constructor initializes items and calls initCart', () => {
    expect(cart.items).toEqual([]);
    expect(cart.initCart).toHaveBeenCalled();
  });

  test('renderCar displays item properly', () => {
    cart.items = [];
    cart.renderCart();
    const cartItems = document.querySelector('.cart-items');
    expect(cartItems.innerHTML).toContain('Your cart is empty');
  });
  test('renderCar displays item properly', () => {
    cart.items = [
      { id: '1', name: 'Item 1', price: 10, quantity: 1, image: 'image1.jpg', sellerId: 'seller1', sellerEmail: 'seller1@example.com' },
    ];
    cart.renderCart();
    const cartItems = document.querySelector('.cart-items');
    expect(cartItems.innerHTML).toContain('Item 1');
    expect(cartItems.innerHTML).toContain('$10.00');
  });

test('updateSubtotal calculates and displays the correct subtotal', () => {

    cart.items = [
      { id: '1', name: 'Item 1', price: 10, quantity: 2 },
      { id: '2', name: 'Item 2', price: 20, quantity: 1 },
    ];
    cart.updateSubtotal();
    const subtotalText = document.querySelector('.subtotal-text');
    expect(subtotalText.textContent).toBe('Subtotal: $40.00');
});
test('getItemQuantity returns the correct quantity for an item', () => {
    cart.items = [
    { id: '1', name: 'Item 1', price: 10, quantity: 2 },
    ];
    expect(cart.getItemQuantity('1')).toBe(2);
    expect(cart.getItemQuantity('2')).toBe(1);
  });

  test('updateQuantity updates the quantity of an item', async () => {
    const updateMock = jest.fn();
    const transactionMock = {
      get: jest.fn(() => ({
        exists: true,
        data: jest.fn(() => ({ items: [{ id: '1', name: 'Item 1', price: 10, quantity: 1 }] })),
      })),
      update: updateMock,
    };
    const runTransactionMock = jest.fn((callback) => callback(transactionMock));
    const dbMock = {
      runTransaction: runTransactionMock,
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    };
    cart.db = dbMock;

    await cart.updateQuantity('1', 3);

    expect(runTransactionMock).toHaveBeenCalled();
    expect(updateMock).toHaveBeenCalledWith(expect.anything(), {
      items: [{ id: '1', name: 'Item 1', price: 10, quantity: 3 }],
      updatedAt: expect.anything(),
    });
  });
  test('removeItem removes an item from the cart', async () => {
    const updateMock = jest.fn();
    const transactionMock = {
      get: jest.fn(() => ({
        exists: true,
        data: jest.fn(() => ({ items: [{ id: '1', name: 'Item 1', price: 10, quantity: 1 }] })),
      })),
      update: updateMock,
    };
    const runTransactionMock = jest.fn((callback) => callback(transactionMock));
    const dbMock = {
      runTransaction: runTransactionMock,
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    };
    cart.db = dbMock;

    await cart.removeItem('1');

    expect(runTransactionMock).toHaveBeenCalled();
    expect(updateMock).toHaveBeenCalledWith(expect.anything(), {
      items: [],
      updatedAt: expect.anything(),
    });
  });


