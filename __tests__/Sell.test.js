
const {uploadImage,ItemINFO,ImageCountANDPrice,GUI } = require("../frontend/Sell.js");


//this checks the PhotosUpload//
test("Photo Upload", async()=>{
    const file = new File(['EMPTY'], 'testimage.jpg', {type: 'image/jpg'});

    const testimg = {
        child: jest.fn().mockReturnThis(),
        put: jest.fn().mockResolvedValue(),
        getDownloadURL: jest.fn().mockResolvedValue("https://sdasdasdasda.com/testimage.jpg")


    };
    

    const Store = {ref: () => testimg};

    const upload = new uploadImage(Store);
    const output = await upload.uploadImage(file);


    expect(output).toBe("https://sdasdasdasda.com/testimage.jpg");



});


//this is the test for details//
test("ItemINFO", ()=>{

    const testitem = ItemINFO.buildItem({
        name: "MacBook", price:"999.99", details: "BUY  THIS NOW YOUR LIFE DEPENDS ON IT", condition: "Used", images: ["img1","img2"], category: "Laptop"

    });
    expect(testitem.name).toBe("MacBook");
    expect(testitem.price).toBe(999.99);
    expect(testitem.condition).toBe("Used");

});




//tests for GUI//
test("CheckPrice negative",() =>{
    expect(ImageCountANDPrice.CheckPrice("-1").valid).toBe(false);
});
test("CheckPrice positive",()=>{
    expect(ImageCountANDPrice.CheckPrice("1").valid).toBe(true);
});









//GUI TEST//
test("GUI ACTIVE", ()=>{
    const open = {style: {display: "totally a GUI"}};
    GUI.showGUI(open);
    expect(open.style.display).toBe("flex");
    
});

test("GUI INACTIVE",()=>{
    const open = {style: {display: " not open "}};
    GUI.HideGUI(open);
    expect(open.style.display).toBe("none")
});
