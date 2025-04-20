const { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } = require('firebase/firestore');
const { getCurrentUserAsync } = require('../backend/auth.js');

const db = getFirestore();

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