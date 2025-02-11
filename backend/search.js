import { intializeApp } from "firebase/app";
	import { getFirestore, collection, getDocs } from "firebase/firestore";
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
	firebase.initializeApp(firebaseConfig);
	const db = firebase.firestore();

	console.log("Firebase initialized:", firebase.apps.length > 0);

	// Fetch and display products
        const productList = document.getElementById('productList');
        const searchInput = document.getElementById('searchInput');

        // Function to fetch and display products
        async function fetchAndDisplayProducts() {
            try {
                // Fetch all documents from the "Products" collection
                const querySnapshot = await db.collection('Products').get();

                // Clear the product list
                productList.innerHTML = "'';

                // Loop through each document
                querySnapshot.forEach((doc) => {
                    const product = doc.data();

                    // Create a product card
                    const productElement = document.createElement('div');
                    productElement.className = 'product';
                    productElement.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
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
