const { getCurrentUserAsync, auth, signOut, onAuthStateChanged } = require('../backend/auth.js');

//this function is used to allow me to implement my css to the innnerHTML of the GUI
function addCSS(){
    //add the GUICSS.css
    let link = document.createElement("link");
    link.rel ="stylesheet"; //attribute rel
    link.href = "../frontend/GUICSS.css"; //href attribute 
    document.head.appendChild(link);

  


}
//function to create GUI when user clicks on the button for HTML
function CreateWindow(){


    if(document.getElementById("popupWindow"))return;

    //GUI is a variable that will contain 
    let GUI = document.createElement("div");
    
    
    //assign the id to the variable GUI

    GUI.id = "popupWindow";

    //apply some css to the GUI via "style" in terms of window dimensions
    GUI.style.position = "fixed";
    GUI.style.top = "50%";
    GUI.style.left = "50%";
    GUI.style.width = "40%";
    GUI.style.height = "80%";
    GUI.style.transform = "translate(-50%, -50%)";

    //Background color and other properties 
    GUI.style.background = "white";
    GUI.style.border = "5px solid green";
    GUI.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    GUI.style.zIndex = "1000"; //This is what allows the GUI to be seen ontop of the exsisting webpage

    addCSS();
    //Add HTML to the GUI as a means of adding content to it
    GUI.innerHTML = 

    

    "<button onclick = CloseWindow() class = closebutton><img src = ../frontend/images/x.png class = ximg></button>"+
    "<span class = ProductUserPFP2></span>"+
    "<p class = ProductAcessID2>Access ID: TA1234</p>"+
    "<p class = ProductUserName2>Joe doe</p>"+
    "<hr class = goldline>"+
    "<img class = productimg src = ../frontend/images/Ipad4.webp>"+
    "<hr class = goldline>"+
    "<div class = spacing>"+
        "<input type=text placeholder= Hello! name=search class = searchbar>"+
        "<h6><b>Description:</b></h6>"+

    "</div>";
    
   

    


    document.body.appendChild(GUI);

}

//create the function for closing the GUI

function CloseWindow(){
    
    let GUI = document.getElementById("popupWindow");

    if(GUI){
        GUI.remove();
    }
}