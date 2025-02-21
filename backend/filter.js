import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
	const firebaseConfig = {
  		apiKey: "AIzaSyAvB5GMQoKYoVn_6nuzIzmU5cqBQCjYSXk",
  		authDomain: "wsu-market-share.firebaseapp.com",
  		databaseURL: "https://wsu-market-share-default-rtdb.firebaseio.com",
  		projectId: "wsu-market-share",
  		storageBucket: "wsu-market-share.firebasestorage.app",
  		messagingSenderId: "176228593560",
  		appId: "1:176228593560:web:bd04d85d9e5944d1b6c5ed",
  		measurementId: "G-HZ3VRX4MK1"
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	console.log("Firebase initialized.");

	// Fetch and display products
        const productList = document.getElementById('productList');
        const searchInput = document.getElementById('searchInput');

        // Function to fetch and display products
async function fetchAndDisplayProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "Products"));

        // Clear the product list
        productList.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const product = doc.data();

            // Create a product card
            const productElement = document.createElement('div');
            productElement.className = 'divPT';
            productElement.innerHTML = `
				<img src="${product.imageUrl}" alt="${product.name}">
                <hr>
                <p class="ProductName fw-semibold">${product.name} - $${product.price}</p>
                <span class="ProductUserPFP"></span>
                <p class="ProductAcessID">Access ID: ${product.accessId}</p>
                <p class="ProductUserName">${product.sellerName}</p>
                <div>
                    <span class="fa fa-star checked rating"></span>
                    <span class="fa fa-star checked rating"></span>
                    <span class="fa fa-star checked rating"></span>
                </div>
				
            `;

            // Append the product card to the product list
            productList.appendChild(productElement);
        });

    } catch (error) {
        console.error("Error fetching products: ", error);
    }
}
        // Fetch and display products when the page loads
        fetchAndDisplayProducts();




// Strategy 1: Filter by Category
const filterByCategory = (products, category) => {
    return products.filter(product => product.category === category);
};

// Strategy 2: Filter by Price Range
const filterByPrice = (products, minPrice, maxPrice) => {
    return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
};

// Strategy 3: Filter by Seller Name
const filterBySellerName = (products, sellerName) => {
    return products.filter(product => product.sellerName.toLowerCase().includes(sellerName.toLowerCase()));
};

// A generic context function that applies a strategy
function applyFilterStrategy(products, strategy, ...args) {
    return strategy(products, ...args);
}
// Function to fetch and display products with dynamic strategy application
async function applyFilter() {
    let category = document.getElementById("categoryFilter").value;
    let minPrice = parseFloat(document.getElementById("minPriceFilter").value);
    let maxPrice = parseFloat(document.getElementById("maxPriceFilter").value);
    let sellerName = document.getElementById("sellerNameFilter").value;

    // Fetch the products from Firebase (this part stays the same as your previous implementation)
    const querySnapshot = await getDocs(collection(db, "Products"));
    const products = [];

    querySnapshot.forEach((doc) => {
        const product = doc.data();
        products.push(product);
    });

    let filteredProducts;

    // Choose the strategy based on user input
    if (category) {
        filteredProducts = applyFilterStrategy(products, filterByCategory, category);
    } else if (minPrice && maxPrice) {
        filteredProducts = applyFilterStrategy(products, filterByPrice, minPrice, maxPrice);
    } else if (sellerName) {
        filteredProducts = applyFilterStrategy(products, filterBySellerName, sellerName);
    } else {
        filteredProducts = products; // No filter applied
    }

    // Now, display the filtered products
    displayProducts(filteredProducts);
}

// Function to display products on the page
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear the existing list

    if (products.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'divPT';
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <hr>
            <p class="ProductName fw-semibold">${product.name} - $${product.price}</p>
            <span class="ProductUserPFP"></span>
            <p class="ProductAcessID">Access ID: ${product.accessId}</p>
            <p class="ProductUserName">${product.sellerName}</p>
            <div>
                <span class="fa fa-star checked rating"></span>
                <span class="fa fa-star checked rating"></span>
                <span class="fa fa-star checked rating"></span>
            </div>
        `;
        productList.appendChild(productElement);
    });
}