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
}
