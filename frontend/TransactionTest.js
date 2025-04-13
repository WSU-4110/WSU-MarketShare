import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDylHe_iXex8F3He6Ez4P49OmLPQMQ_J6k",
    authDomain: "sell-25f45.firebaseapp.com",
    databaseURL: "https://sell-25f45-default-rtdb.firebaseio.com",
    projectId: "sell-25f45",
    storageBucket: "sell-25f45.firebasestorage.app",
    messagingSenderId: "953873344669",
    appId: "1:953873344669:web:7b55ea629c5397a72a0c74",
    measurementId: "G-9DB3NVDSQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addTransaction(transactionData) {
    try {
        const transactionWithTimestamp = {
            ...transactionData,
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, "Transactions"), transactionWithTimestamp);
        console.log("Transaction added with ID: ", docRef.id);
        return {
            success: true,
            transactionId: docRef.id
        };
    } catch (error) {
        console.error("Error adding transaction: ", error);
        return {
            success: false,
            error: error.message
        };
    }
}

export async function fetchAndDisplayTransactionHistory(BuyerID) {
    let transactionContainer = document.getElementById("transaction-container");
    if (!transactionContainer) {
        console.error("Error: Could not find 'transaction-container' div.");
        return;
    }

    try {
        const transactionsRef = collection(db, "Transactions");
        const q = query(transactionsRef, where("BuyerID", "==", BuyerID));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            transactionContainer.innerHTML = "<p>No transactions found.</p>";
            return;
        }

        for (const doc of querySnapshot.docs) {
            let transaction = doc.data();
            const productRef = collection(db, "Products");
            const productQuery = query(productRef, where("ProductID", "==", transaction.ProductID));
            const productSnapshot = await getDocs(productQuery);

            if (!productSnapshot.empty) {
                const productData = productSnapshot.docs[0].data();
                let transactionElement = document.createElement("div");
                transactionElement.classList.add("product");
                transactionElement.innerHTML = `
                    <img src="${productData.ImageURL || 'default-image.jpg'}" alt="${productData.ProductName}">
                    <h4>${productData.ProductName}</h4>
                    <p>Category: ${productData.Category}</p>
                    <p>Price: $${productData.Price}</p>
                    <p>Seller: ${transaction.SellerName}</p>
                    <p><strong>Buyer:</strong> ${transaction.BuyerName}</p>
                `;
                transactionContainer.appendChild(transactionElement);
            }
        }
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        transactionContainer.innerHTML = "<p>Failed to load transactions.</p>";
    }
}