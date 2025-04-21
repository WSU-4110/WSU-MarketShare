const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged, signOut } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
  authDomain: "wayne-state-marketshare.firebaseapp.com",
  projectId: "wayne-state-marketshare",
  storageBucket: "wayne-state-marketshare.appspot.com",
  messagingSenderId: "11946478991",
  appId: "1:11946478991:web:a2382361767bb0a5e54ffa",
  measurementId: "G-FCRMC500EK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let currentUser = null;

// Auth state handler
const handleAuthStateChanged = (user) => {
  try {
    currentUser = user;
    if (user) {
      console.log("✅ Logged in as:", user.email);
    } else {
      console.log("⛔ User not logged in");
    }
  } catch (error) {
    console.error("Auth state error:", error);
    currentUser = null;
  }
};

// Initialize auth state listener
const authListener = onAuthStateChanged(auth, handleAuthStateChanged);

// Async user getter
function getCurrentUserAsync() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (unsubscribe) {
                unsubscribe();
            }
            resolve(user);
        });
    });
}

// Token management
const getIdToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

const getAuthHeaders = async () => {
  const token = await getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function updateAuthUI() {
  const authContainer = document.getElementById('authContainer');
  
  if (!authContainer) {
      console.error('Auth container not found');
      return;
  }

  try {
      const user = await getCurrentUserAsync();
      console.log('Current user:', user);

      if (user) {
          // Update button styling for logged-in state
          authContainer.innerHTML = `
              <div class="d-flex align-items-center">
                  <span class="text-white me-3">Welcome, ${user.email}</span>
                  <button id="logoutButton" class="btn btn-light">Logout</button>
              </div>
          `;
          console.log('Auth container updated for logged-in state.');

          const logoutButton = document.getElementById('logoutButton');
          if (logoutButton) {
              console.log('Logout button found. Adding event listener.');
              logoutButton.addEventListener('click', async () => {
                  try {
                      await signOut(auth);
                      console.log('Successfully logged out');
                      location.reload(); // Reload the page after logout
                  } catch (error) {
                      console.error('Logout failed:', error);
                  }
              });
          } else {
              console.error('Logout button not found.');
          }
      } else {
          // Update button styling for logged-out state
          authContainer.innerHTML = `
              <a href="login.html" class="btn btn-light">
                  Login
                  <i class="fas fa-sign-in-alt ms-1"></i>
              </a>
          `;
          console.log('Auth container updated for logged-out state.');
      }
  } catch (error) {
      console.error('Error updating auth UI:', error);
  }
}

module.exports = { 
    getCurrentUserAsync, 
    getIdToken, 
    getAuthHeaders,
    auth,
    signOut,
    onAuthStateChanged
};
