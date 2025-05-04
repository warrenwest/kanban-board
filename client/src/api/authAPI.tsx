import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // This function will handle the login logic
  // You will need to make a POST request to the server's login endpoint
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  // Assuming the server returns a token on successful login
  if (data.token) {
    // Store the token in localStorage or sessionStorage
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("No token received");
  }
  return data; // Return the data received from the server
};

export { login };
