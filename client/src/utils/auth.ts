import { jwtDecode } from "jwt-decode";

// Define your own payload interface
interface JwtPayload {
  exp: number;
  [key: string]: any; // Allows for additional properties like username, email, etc.
}

class AuthService {
  /**
   * Returns decoded user profile from token
   */
  getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  /**
   * Checks if user is logged in (i.e. token exists and is not expired)
   */
  loggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return !this.isTokenExpired(token);
  }

  /**
   * Checks if the JWT is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat decoding errors as expired
    }
  }

  /**
   * Retrieves token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  /**
   * Saves token to localStorage and redirects to homepage
   */
  login(idToken: string) {
    localStorage.setItem("token", idToken);
    window.location.href = "/"; // You can customize the redirect
  }

  /**
   * Removes token from localStorage and redirects to login page
   */
  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
}

export default new AuthService();
