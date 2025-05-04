import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (!token) {
      return null;
    }
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      // Check if the token has expired
      return !this.isTokenExpired(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (!decodedToken || !decodedToken.exp) {
        return true; // If no expiration, consider it expired
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Consider invalid tokens as expired
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("token") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("token", idToken);
    // TODO: redirect to the home page
    window.location.href = "/"; // Redirect to home page
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("token");
    // TODO: redirect to the login page
    window.location.href = "/login"; // Redirect to login page
  }
}

export default new AuthService();
