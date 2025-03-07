

//This part of code is all backend for the Product GUI or pop-up//

function addCSS() {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "GUICSS.css";

    document.head.appendChild(link);
  }
  
  function CreateWindow(product) {
    if (document.getElementById("popupWindow")) return;
  
    const GUI = document.createElement("div");
    GUI.id = "popupWindow";
    GUI.style.position = "fixed";
    GUI.style.top = "50%";
    GUI.style.left = "50%";
    GUI.style.width = "40%";
    GUI.style.height = "80%";
    GUI.style.transform = "translate(-50%, -50%)";
    GUI.style.background = "white";
    GUI.style.border = "5px solid green";
    GUI.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    GUI.style.zIndex = "1000";
    GUI.style.overflowY = "auto";
    GUI.style.padding = "20px";
  
    addCSS();



    //pop-up for listing of product in FrontPage//
  
    GUI.innerHTML = `
      <button onclick="CloseWindow()" class="closebutton">
        <img src="images/x.png" class="ximg">
      </button>
      <div class="product-details">
        <h2>${product.name}</h2>
        <div class="image-gallery">
          ${product.images.map(img => `
            <img src="${img}" class="product-img" style="
              max-width: 100%;
              height: auto;
              margin: 10px 0;
              border-radius: 10px;
            ">
          `).join('')}
        </div>
        <p><strong>Price:</strong> $${parseFloat(product.price).toFixed(2)}</p>
        <p><strong>Condition:</strong> ${product.condition}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.details}</p>
      </div>
    `;
  
    document.body.appendChild(GUI);
  }


  //close the GUI//
  
  function CloseWindow() {
    const GUI = document.getElementById("popupWindow");
    if (GUI) GUI.remove();
  }