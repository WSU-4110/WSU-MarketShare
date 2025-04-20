//This test will deal with image uploading//
module.exports.uploadImage =class uploadImage{
    constructor(storage){
        this.storage = storage;
    }

    //change back if issues persist//
    async uploadImage(file){
        const storageRef = this.storage.ref();
        const fileRef = storageRef.child(`itens/${Date.now()}_${file.name}`);
        await fileRef.put(file);
        return await fileRef.getDownloadURL();
    }
}

//this is a test where i have to enter product details//
module.exports.ItemINFO = class ItemINFO{
    static buildItem({name,price,details,condition,images,category}){
        return{
            name, price:parseFloat(price),details,condition,images,category, createdAt: new Date()
        };
    }
}


//this test deals with the images and price logic //

module.exports.ImageCountANDPrice = class ImageCountANDPrice{
    static checkImages(images){
        if(images.length === 0 || !images){
            return{valid:false, message: "Need 1 image"};

        }

        else if(images.length > 4){
            return{valid: false,message: "ONLY 4 IMAGES!!"};
        }
        return{valid: true};

    }

    static CheckPrice(price){
        const value = parseFloat(price);
        if(isNaN(value)|| value < 0){
            return{valid: false, message: "price is not positive"};
        }
        return{valid:true};
    }
    
}


//these last 2 deal with closing the GUI//

module.exports.GUI = class GUI{
    static showGUI(popupElement){
        popupElement.style.display = "flex";
    }
    

    static HideGUI(popupElement){
        popupElement.style.display = "none";
    }
}




