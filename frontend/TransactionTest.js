import { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

export async function addTransaction(transactionData) {
    try {
        const transactionWithTimestamp = {
            ...transactionData,
            createdAt: serverTimestamp()
        };

        const transactionsRef = collection(db, "Transactions");
        const docRef = await addDoc(transactionsRef, transactionWithTimestamp);

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

        transactionContainer.innerHTML = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return `<div>${data.SellerName} sold ${data.ProductID} to ${data.BuyerID}</div>`;
        }).join('');
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        transactionContainer.innerHTML = "<p>Failed to load transactions.</p>";
    }
}