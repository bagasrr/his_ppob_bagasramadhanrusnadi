import axios from "axios";

export const GetProfile = async (token: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Get Profile API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};
export const GetBalance = async (token: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get Balance API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};
export const GetServices = async (token: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get Services API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};
export const GetBanners = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/banner`);
    return response.data;
  } catch (error) {
    console.error("Get Banners API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};
