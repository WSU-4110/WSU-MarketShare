class Cart{
constructor() {
    this.items = [];
}

addItem(item){
    this.item.push(item);
    
}
remmoveItem(id){
    this.items = thia.items.filter(item => item.id !== id);
}

getItems(){
    return this.items;
}
clearCart(){
    this.items = [];
}

}