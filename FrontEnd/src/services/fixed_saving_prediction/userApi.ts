// api.ts
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
  ErrorResponse,
  UserProfile,
  UpdateUserRequest,
} from "@s/types/user-types";

const API_BASE_URL = "http://127.0.0.1:5000";

// Register User
export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse | ErrorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while registering." };
  }
};

// Login User
export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse | ErrorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while logging in." };
  }
};
export const fetchUserByEmail = async (
  email: string
): Promise<UserProfile | ErrorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user?email=${email}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while fetching user details." };
  }
};

// Update user
export const updateUser = async (
  email: string,
  data: UpdateUserRequest
): Promise<UserProfile | ErrorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, ...data }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating user details." };
  }
};

// Delete user
export const deleteUser = async (
  email: string
): Promise<{ message: string } | ErrorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the user." };
  }
};
