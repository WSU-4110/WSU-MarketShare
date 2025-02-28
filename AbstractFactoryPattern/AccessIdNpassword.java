import com.google.firebase.auth.*;

public class AccessIdNpassword extends AuthMethod {

    @Override
    public void login(String email, String password) {
        // Validate email format
        if (!isValidEmail(email)) {
            System.out.println("Invalid email format.");
            return;
        }

        if (!isStrongPassword(password)) {
            System.out.println("Password must be at least 6 characters long.");
            return;
        }


        FirebaseAuth auth = FirebaseAuth.getInstance();
        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = auth.getCurrentUser();

                        if (user != null && user.isEmailVerified()) {
                            System.out.println("Login successful: " + user.getEmail());
                        } else {
                            System.out.println("Please verify your email before logging in.");
                        }
                    } else {
                        System.out.println("Login failed: " + task.getException().getMessage());
                    }
                });
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    }

    private boolean isStrongPassword(String password) {
        return password.length() >= 8;
    }
}
