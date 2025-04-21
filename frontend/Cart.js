

class Cart {
    constructor() {
        this.items = [];
        this.initCart();
    }

    async initCart() {
        const user = await getCurrentUserAsync();
        if (!user) {
            console.log('No user logged in');
            window.location.href = "login.html";
            return;
        }
        this.userId = user.uid;
        this.setupFirebaseListener();
        this.initEventListeners();
    }

    setupFirebaseListener() {
        db.collection("carts").doc(this.userId).onSnapshot((doc) => {
            if (doc.exists) {
                const cartData = doc.data();
                this.items = cartData.items || [];
                this.renderCart();
                this.updateSubtotal();
            } else {
                this.items = [];
                this.renderCart();
                this.updateSubtotal();
            }
        });
    }

    async processCheckout() {
        try {
            const user = await getCurrentUserAsync();
            if (!user) {
                alert('Please log in to checkout');
                return false;
            }

            const batch = db.batch();
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();

            for (const item of this.items) {
                const transactionRef = db.collection("transactions").doc();
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

            const cartRef = db.collection("carts").doc(this.userId);
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

    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        
        if (this.items.length === 0) {
            cartItems.innerHTML = `
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
        console.log('Update quantity of an item ${item.id} to ${newQuantity}');
        db.runTransaction(async (transaction) => {
            const cartRef = db.collection("carts").doc(this.userId);
            const cartDoc = await transaction.get(cartRef);
            
            if (cartDoc.exists) {
                const cartData = cartDoc.data();
                const itemIndex = cartData.items.findIndex(item => item.id === itemId);
                
                if (itemIndex !== -1) {
                    cartData.items[itemIndex].quantity = Math.max(1, newQuantity);
                    transaction.update(cartRef, {
                        items: cartData.items,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
            }
        }).catch(error => {
            console.error("Transaction error:", error);
        });
    }

    updateSubtotal(){
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
            }
            else if (e.target.closest('.minus')) {
                const currentQty = parseInt(cartItem.querySelector('.quantity-input').value);
                this.updateQuantity(itemId, currentQty - 1);
            }
            else if (e.target.closest('.remove-btn')) {
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

    getItemQuantity(itemId) {
        const item = this.items.find(i => i.id === itemId);
        return item ? item.quantity : 1;
    }

    removeItem(itemId){
        db.runTransaction(async (transaction) => {
            const cartRef = db.collection("carts").doc(this.userId);
            const cartDoc = await transaction.get(cartRef);
            
            if (cartDoc.exists) {
                const cartData = cartDoc.data();
                const updatedItems = cartData.items.filter(item => item.id !== itemId);
                
                transaction.update(cartRef, {
                    items: updatedItems,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        }).catch(error => {
            console.error("Transaction error:", error);
        });
    }
}

module.exports = Cart;