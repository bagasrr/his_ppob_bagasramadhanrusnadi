import axios from "axios";
import type z from "zod";
import type { loginSchema } from "../zod/validation";

export const RegisterAccount = async (userData: { email: string; first_name: string; last_name: string; password: string; confirm_password: string }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/registration`, userData);
    return response.data;
  } catch (error) {
    console.error("Register API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};

type LoginData = z.infer<typeof loginSchema>;
export const LoginAccount = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};

export const UpdateProfile = async (token: string, profileData: { first_name: string; last_name: string }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/profile/update`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update Profile API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};

export const UpdateProfileImage = async (token: string, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/profile/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update Profile Image API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};
