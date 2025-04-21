class Cart {
    constructor() {
        this.items = [];
        this.userId = null;
        this.initEventListeners();
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

    async updateQuantity(itemId, newQuantity) {
        if (!this.items) return;

        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            this.items[itemIndex].quantity = Math.max(1, newQuantity);
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
            }
            else if (e.target.closest('.minus')) {
                const currentQty = parseInt(cartItem.querySelector('.quantity-input').value);
                this.updateQuantity(itemId, currentQty - 1);
            }
            else if (e.target.closest('.remove-btn')) {
                this.removeItem(itemId);
            }
        });

        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert("Your cart is empty!");
                    return;
                }
                document.getElementById('checkoutModal').style.display = 'flex';
            });
        }
    }

    getItemQuantity(itemId) {
        const item = this.items.find(i => i.id === itemId);
        return item ? item.quantity : 1;
    }

    async removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }
}

module.exports = Cart;