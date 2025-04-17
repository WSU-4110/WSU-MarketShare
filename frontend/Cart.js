class Cart {
    constructor(){
        this.items = [];
        this.userID = null;
        this.initCart();
    }
    async initCart(){
    const user = await this.getCurrenntUserAsync();
    if(!user){
        console.log('no user logged in');
        window.location.href = "login.html";
        return;
    }
    this.userId = user.uid;
    this.setupFirebaseListener();
    this.initEventListeners();
    }
    getCurrenntUserAsync(){
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
}
