import { jwtDecode } from "jwt-decode";

// Define your own payload interface
interface JwtPayload {
  exp: number;
  [key: string]: any; // Allows for additional properties like username, email, etc.
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      return !this.isTokenExpired(token);
    } catch (error) {
      console.error("Error checking token:", error);
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) {
        return true; // No expiration? Treat it as expired.
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat decoding errors as expired
    }
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  login(idToken: string) {
    localStorage.setItem("token", idToken);
    window.location.href = "/"; // Redirect to home
  }

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login
  }
}

export default new AuthService();
