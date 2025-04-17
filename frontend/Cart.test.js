function runTests(){
    const cart = new Cart();
    console.log('Test: initialize');
    console.assert(cart.items.length ===2, 'initial item lenght should be 2');

    console.log('test: update quantity');
    cart.updateQuantity('1', 3);
    console.assert(cart.getItemQuantity('1') === 3, 'item 1 should have an amount of 3');

    console.log('test: remove item');
    cart.removeItem('1');;
    console.assert(cart.items.length === 1, 'Items length should be 1 after removing item 1');


    console.log('test: update subtotal');
    cart.updateSubtotal();
    const subtotalText = document.querySelector('.subtotal-text').textContent;
    console.assert(cart.subtotalText === 'Subtotal: 40.00', 'Subttal should be 40.00');

    console.log('test: checkout');
    cart.processCheckout().then(success =>{
        console.assert(success, 'Checkout should be sucessfull');
        console.log('all tests passed');

    }).catch(error => {
        console.error('test failed', error);
    });
}
runTests();