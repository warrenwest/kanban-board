import { UserLogin } from "../interfaces/UserLogin";
import AuthService from "../utils/auth"; // If you're using AuthService

const login = async (userInfo: UserLogin) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  if (!data.token) {
    throw new Error("No token received from server");
  }

  AuthService.login(data.token); // Or localStorage.setItem("token", data.token)

  return data;
};

export { login };
