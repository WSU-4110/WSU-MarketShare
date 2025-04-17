const Cart = require('./Cart');


describe('Cart', () => {
  let cart;
  
  beforeEach(() => {
    cart = new Cart();
  });

  test('Shoould start with an empty cart', () =>{
    expect(cart.getItems()).toEqual([]);

  });

  test('Should add an item to the cart', () => {
    cart.addItem({ id: 1, name: 'Apple' });
    expect(cart.getItems()).toEqual([{ id: 1, name: 'Apple' }]);
  });

  test('Should remove item by id', () => {
     
    cart.addItem({ id: 1, name: 'Apple' });
    cart.addItem({ id: 2, name: 'Banana' });
     cart.removeItem(1);
     
    expect(cart.getItems()).toEqual([{ id: 2, name: 'Banana' }]);
  });

  test('Should clear the cart', () => {
    cart.addItem({ id: 1, name: 'Apple' });
    cart.clearCart();

    expect(cart.getItems()).toEqual([]);

  });
});
