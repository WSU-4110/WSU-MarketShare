// Product GUI the backend of the GUI

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

  
  const safeProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      condition: product.condition,
      category: product.category,
      details: product.details,
      images: product.images
  };


  //everything in GUI from product images to price
  GUI.innerHTML = `
      <button onclick="CloseWindow()" class="closebutton">
          <img src="images/x.png" alt="Close" class="ximg" onerror="this.src='https://via.placeholder.com/30'">
      </button>
      <div class="product-details">
          <h2>${safeProduct.name}</h2>
          <div class="image-gallery">
              ${safeProduct.images.map(img => `
                  <img src="${img}" class="product-img" style="
                      max-width: 100%;
                      height: auto;
                      margin: 10px 0;
                      border-radius: 10px;
                  " onerror="this.src='https://via.placeholder.com/200'">
              `).join('')}
          </div>
          <p><strong>Price:</strong> $${parseFloat(safeProduct.price).toFixed(2)}</p>
          <p><strong>Condition:</strong> ${safeProduct.condition}</p>
          <p><strong>Category:</strong> ${safeProduct.category}</p>
          <p><strong>Description:</strong> ${safeProduct.details}</p>
          <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(safeProduct).replace(/"/g, '&quot;')})">
              <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
      </div>
  `;

  document.body.appendChild(GUI);
}

// add to cart button functionality part
function addToCart(product) {
  try {
      // Firebase stuff
      if (!firebase.apps.length) {
          const firebaseConfig = {
              apiKey: "AIzaSyDylHe_iXex8F3He6Ez4P49OmLPQMQ_J6k",
              authDomain: "sell-25f45.firebaseapp.com",
              projectId: "sell-25f45",
              storageBucket: "sell-25f45.firebasestorage.app",
              messagingSenderId: "953873344669",
              appId: "1:953873344669:web:7b55ea629c5397a72a0c74",
              measurementId: "G-9DB3NVDSQJ"
          };
          firebase.initializeApp(firebaseConfig);
      }
      const db = firebase.firestore();
      
      const userId = "current_user"; 
      
      const cartItem = {
          id: product.id || Date.now().toString(),
          name: product.name,
          price: parseFloat(product.price),
          quantity: 1,
          image: product.images?.[0] || "https://via.placeholder.com/100"
      };

      const cartRef = db.collection("carts").doc(userId);
      
      db.runTransaction(async (transaction) => {
          const cartDoc = await transaction.get(cartRef);
          
          if (cartDoc.exists) {
              const cartData = cartDoc.data();
              const existingItemIndex = cartData.items.findIndex(item => item.id === cartItem.id);
              
              if (existingItemIndex >= 0) {
                  const updatedItems = [...cartData.items];
                  updatedItems[existingItemIndex].quantity += 1;
                  transaction.update(cartRef, {
                      items: updatedItems,
                      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                  });
              } else {
                  transaction.update(cartRef, {
                      items: [...cartData.items, cartItem],
                      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                  });
              }
          } else {
              transaction.set(cartRef, {
                  items: [cartItem],
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  updatedAt: firebase.firestore.FieldValue.serverTimestamp()
              });
          }

      }).then(() => {
          console.log("Cart updated successfully");
          alert(`${product.name} has been added to your cart!`);
          CloseWindow();

      
          //if in the future any rules get changed i will receive the errors so here are the errors i may recieve

      }).catch((error) => {
          console.error("Transaction failed: ", error);
          alert("There was an error adding the item to your cart.");
      });

  } catch (error) {
      console.error("Error in addToCart: ", error);
      alert("There was an error initializing the cart system.");
  }
}


//close button 
function CloseWindow() {
  const GUI = document.getElementById("popupWindow");
  if (GUI) GUI.remove();
}
