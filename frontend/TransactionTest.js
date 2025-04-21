const { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } = require('firebase/firestore');
const { getCurrentUserAsync, auth } = require('../backend/auth.js');
const { initializeApp } = require('firebase/app');

// Firebase configurations
const prodConfig = {
    apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
    authDomain: "wayne-state-marketshare.firebaseapp.com",
    projectId: "wayne-state-marketshare",
    
};

const testConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    
};

// Initialize Firebase based on environment
const app = process.env.NODE_ENV === 'test' ? initializeApp(testConfig) : initializeApp(prodConfig);
const db = getFirestore(app);

async function fetchAndDisplayTransactionHistory() {
    let transactionContainer = document.getElementById("transaction-container");
    if (!transactionContainer) {
        console.error("Error: Could not find 'transaction-container' div.");
        return;
    }

    try {
        const user = await getCurrentUserAsync();
        if (!user) {
            transactionContainer.innerHTML = "<p>Please log in to view your transactions</p>";
            return;
        }

        transactionContainer.innerHTML = "<p>Loading transactions...</p>";

        const transactionsRef = collection(db, "transactions");
        const q = query(transactionsRef, where("BuyerID", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            transactionContainer.innerHTML = "<p>No transactions found.</p>";
            return;
        }

        transactionContainer.innerHTML = "";
        querySnapshot.docs.forEach(doc => {
            const data = doc.data();
            const transactionElement = document.createElement("div");
            transactionElement.innerHTML = `
                <p>Buyer ID: ${data.BuyerID}</p>
                <p>Product ID: ${data.ProductID}</p>
                <p>Seller: ${data.SellerName}</p>
            `;
            transactionContainer.appendChild(transactionElement);
        });

    } catch (error) {
        console.error("Error fetching transaction history:", error);
        transactionContainer.innerHTML = "<p>Failed to load transactions.</p>";
    }
}

async function addTransaction(transactionData) {
    try {
        const transactionsRef = collection(db, "transactions");
        const docRef = await addDoc(transactionsRef, {
            ...transactionData,
            createdAt: serverTimestamp()
        });
        return {
            success: true,
            transactionId: docRef.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = {
    fetchAndDisplayTransactionHistory,
    addTransaction
};