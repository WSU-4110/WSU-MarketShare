class Cart{
    constructor() {
      this.items = [];
    }


    addItem(item) {
      this.items.push(item);
    }
  
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id);

    }
  
    getItems() {
      return this.items;
    }
  
    clearCart() {
      this.items = [];
    }

  }
  
  module.exports = Cart;