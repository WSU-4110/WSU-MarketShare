const Cart = require('./Cart');
const { getCurrentUserAsync } = require('../backend/auth.js');

jest.mock('../backend/auth.js', () => ({
  getCurrentUserAsync: jest.fn(),
}));

beforeEach(() => {
  // Reset DOM
  document.body.innerHTML = `
    <div class="cart-items"></div>
    <div class="subtotal-text"></div>
    <button class="checkout-btn"></button>
    <div id="checkoutModal"></div>
  `;
});

describe('Cart Class', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
    cart.items = []; // Safe default
  });

  test('constructor initializes items array', () => {
    expect(cart.items).toEqual([]);
  });

  test('renderCart shows empty cart message when no items', () => {
    cart.renderCart();
    const html = document.querySelector('.cart-items').innerHTML;
    expect(html).toContain('Your cart is empty');
  });

  test('renderCart displays item details when items exist', () => {
    cart.items = [
      {
        id: '1',
        name: 'Test Item',
        price: 12.5,
        quantity: 1,
        image: 'img.jpg',
      }
    ];
    cart.renderCart();
    const html = document.querySelector('.cart-items').innerHTML;
    expect(html).toContain('Test Item');
    expect(html).toContain('$12.50');
  });

  test('updateSubtotal calculates correct total', () => {
    cart.items = [
      { id: '1', price: 10, quantity: 2 },
      { id: '2', price: 5, quantity: 3 },
    ];
    cart.updateSubtotal();
    const subtotalText = document.querySelector('.subtotal-text').textContent;
    expect(subtotalText).toBe('Subtotal: $35.00');
  });

  test('getItemQuantity returns correct quantity', () => {
    cart.items = [{ id: 'abc', quantity: 4 }];
    expect(cart.getItemQuantity('abc')).toBe(4);
    expect(cart.getItemQuantity('xyz')).toBe(1); // fallback
  });

  test('updateQuantity sets new quantity', async () => {
    const updateMock = jest.fn();
    const transactionMock = {
      get: jest.fn(() => ({
        exists: true,
        data: () => ({ items: [{ id: 'abc', name: 'Test', price: 5, quantity: 1 }] }),
      })),
      update: updateMock,
    };

    const runTransactionMock = jest.fn((cb) => cb(transactionMock));
    global.db = {
      runTransaction: runTransactionMock,
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    };

    cart.userId = 'testUser';
    cart.updateQuantity = Cart.prototype.updateQuantity.bind(cart);
    await cart.updateQuantity('abc', 3);

    expect(updateMock).toHaveBeenCalledWith(expect.anything(), {
      items: [{ id: 'abc', name: 'Test', price: 5, quantity: 3 }],
      updatedAt: expect.anything(),
    });
  });
});
