// Product GUI the backend of the GUI

// Import the auth module at the top of the file
import { getCurrentUserAsync, auth } from '../backend/auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

function addCSS() {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "GUICSS.css";
  document.head.appendChild(link);
}

export function CreateWindow(product) {
  // Add debug logging
  console.log('Product data:', product);
  console.log('User email:', product.userEmail);

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
      id: product.id || '',
      name: product.name || 'Unnamed Product',
      price: product.price || 0,
      condition: product.condition || 'Not specified',
      category: product.category || 'Uncategorized',
      details: product.details || 'No description available',
      images: product.images || [],
      // Change how we handle the email
      userEmail: product.userEmail || product.sellerEmail || 'Email not available',
      userId: product.userId || 'unknown'  // Add userId for tracking
  };
  console.log('Product data:', product);
  console.log('Seller email:', product.userEmail);
  console.log('Safe product data:', safeProduct);

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
          <div class="seller-info">
              <p><strong>Contact Seller:</strong> 
                  ${safeProduct.userEmail !== 'Email not available' 
                      ? `<a href="mailto:${safeProduct.userEmail}" class="seller-email">${safeProduct.userEmail}</a>`
                      : '<span class="no-email">Email not available</span>'}
              </p>
          </div>
          <button class="add-to-cart-btn" data-product='${JSON.stringify(safeProduct)}'>
              <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
      </div>
  `;

  // Add some CSS for the seller info
  const style = document.createElement('style');
  style.textContent = `
    .seller-info {
      margin: 15px 0;
      padding: 10px;
      background: #f5f5f5;
      border-radius: 5px;
    }
    .seller-email {
      color: #086208 !important;
      text-decoration: underline;
    }
    .no-email {
      color: #666;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);

  // Add event listener for add to cart button
  const addToCartBtn = GUI.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
      const productData = JSON.parse(addToCartBtn.dataset.product);
      addToCart(productData);
  });

  document.body.appendChild(GUI);
}

// add to cart button functionality part
export async function addToCart(product) {
    try {
        const user = await getCurrentUserAsync();
        if (!user) {
            alert('Please log in to add items to cart');
            window.location.href = "login.html";
            return;
        }

        const userId = user.uid;
        
        // Add null checks and default values for all fields
        const cartItem = {
            id: product.id || `item_${Date.now()}`,
            name: product.name || 'Unnamed Product',
            price: parseFloat(product.price) || 0,
            quantity: 1,
            image: product.images?.[0] || "https://via.placeholder.com/100",
            addedAt: new Date().toISOString(),
            sellerId: product.userId || 'unknown',
            sellerEmail: product.userEmail || 'unknown'
        };

        const cartRef = db.collection("carts").doc(userId);
        
        await db.runTransaction(async (transaction) => {
            const cartDoc = await transaction.get(cartRef);
            const timestamp = new Date().toISOString(); // Use ISO string for consistency
            
            if (cartDoc.exists) {
                const cartData = cartDoc.data();
                const items = cartData.items || []; // Add default empty array
                const existingItemIndex = items.findIndex(item => item.id === cartItem.id);
                
                if (existingItemIndex >= 0) {
                    const updatedItems = [...items];
                    updatedItems[existingItemIndex].quantity += 1;
                    transaction.update(cartRef, {
                        items: updatedItems,
                        updatedAt: timestamp
                    });
                } else {
                    transaction.update(cartRef, {
                        items: [...items, cartItem],
                        updatedAt: timestamp
                    });
                }
            } else {
                transaction.set(cartRef, {
                    items: [cartItem],
                    createdAt: timestamp,
                    updatedAt: timestamp,
                    userId: userId // Add userId to the cart document
                });
            }
        });

        console.log('Item added to cart successfully');
        alert('Item added to cart');

    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('An error occurred while adding the item to the cart. Please try again.');
    }
}

//close button 
export function CloseWindow() {
  const GUI = document.getElementById("popupWindow");
  if (GUI) GUI.remove();
}
