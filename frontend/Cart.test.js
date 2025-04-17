class Cart {
    constructor(){
        this.items = [];
        this.userId = null;
        this.initCart();
    }
    async initCart(){
    const user = await this.getCurrentUserAsync();
    if(!user){
        console.log('no user logged in');
        window.location.href = "login.html";
        return;
    }
    this.userId = user.uid;
    this.setupFirebaseListener();
    this.initEventListeners();
    }
    getCurrentUserAsync(){
        return new Promise((resolve) =>{
            resolve({ uid: 'test-user-id', email: 'test@example.com' });

        });
    }
    setupFirebaseListener(){
        this.items = [
            { id: '1', name: 'Item 1', price: 10, quantity: 1, sellerId: 'seller1', sellerEmail: 'seller1@example.com', image: 'image1.jpg' },
            { id: '2', name: 'Item 2', price: 20, quantity: 2, sellerId: 'seller2', sellerEmail: 'seller2@example.com', image: 'image2.jpg' }
        ];
        this.renderCart();
        this.updateSubtotal();
    }
    async processCheckout(){
        try {
            const user = await this.getCurrentUserAsync();
            if (!user) {
                alert('Please log in to checkout');
                return false;
            }

            const batch = { commit: async () => {} }; // Mock batch commit
            const timestamp = new Date(); // Mock timestamp

            for (const item of this.items) {
                const transactionRef = { set: () => {} }; // Mock transactionRef
                batch.set(transactionRef, {
                    itemId: item.id,
                    itemName: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    buyerId: user.uid,
                    buyerEmail: user.email,
                    sellerId: item.sellerId,
                    sellerEmail: item.sellerEmail,
                    createdAt: timestamp,
                    status: 'completed'
                });
            }
            const cartRef = { update: () => {} }; // Mock cartRef
            batch.update(cartRef, {
                items: [],
                updatedAt: timestamp
            });

            await batch.commit();
            return true;
        } catch (error) {
            console.error("Checkout error:", error);
            alert('Checkout failed. Please try again.');
            return false;
        }
        }
        renderCart(){
            const cartItems = document.querySelector('.cart-items');
            if(this.items.length === 0){
                cartItems.innerHTML =`
                <div class="empty-cart-message">
                    <i class="fa-solid fa-cart-arrow-down"></i><br>
                    Your cart is empty
                </div>
            `;
return;
            }
            cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');
        }


        updateQuantity(itemId, newQuantity){
            console.log('update amount of item ${itemId} to ${newQuantity}');
            const itemIndex = this.items.findIndex(item => item.id === itemId);
            if(itemIndex !== -1){
                this.items[itemIndex].quantity = Math.max(1, newQuantity)
                this.renderCart();
                this.updateSubtotal();

            }

        }
        updateSubtotal() {
            const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.querySelector('.subtotal-text').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        }
        initEventListeners() {
            document.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) return;
                const itemId = cartItem.dataset.id;
    
                if (e.target.closest('.plus')) {
                    const currentQty = parseInt(cartItem.querySelector('.quantity-input').value);
                    this.updateQuantity(itemId, currentQty + 1);
                } else if (e.target.closest('.minus')) {
                    const currentQty = parseInt(cartItem.querySelector('.quantity-input').value);
                    this.updateQuantity(itemId, currentQty - 1);
                } else if (e.target.closest('.remove-btn')) {
                    this.removeItem(itemId);
                }
            });
    
            document.querySelector('.checkout-btn').addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert("Your cart is empty!");
                    return;
                }
                document.getElementById('checkoutModal').style.display = 'flex';
            });
        }

        getItemQuantity(itemId){

            const item = this.items.find(i => i.id === itemId);
            return item ? item.quantity : 1;
        }
        removeItem(itemId){
            this.items = this.items.filter(item => item.id !== itemId);
            this.renderCart();
            this.updateSubtotal();
        }


}





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