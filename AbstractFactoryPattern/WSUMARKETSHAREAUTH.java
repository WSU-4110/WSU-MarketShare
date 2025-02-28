public class WSUMARKETSHAREAUTH extends AuthMethod {

    @Override
    public void login(String email, String password) {
        System.out.println("Redirecting to WSU MarketShare Login...");
        try {
            java.awt.Desktop.getDesktop().browse(new java.net.URI("https://wsu-4110.github.io/WSU-MarketShare/frontend/FrontPage.html"));
        } catch (Exception e) {
            System.out.println("Failed to open WSU Marketshare login: " + e.getMessage());
        }
    }
}
