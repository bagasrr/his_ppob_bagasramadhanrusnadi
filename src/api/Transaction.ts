import axios from "axios";

// Terima amount sebagai number agar konsisten dengan form
export const TopUpBalance = async (token: string, top_up_amount: number) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/topup`,
      { top_up_amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Top Up API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const MakeTransaction = async (token: string, service_code: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/transaction`,
      { service_code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Make Transaction API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const GetTransactionHistory = async (token: string, offset: number, limit: number) => {
  try {
    const response = await axios.get(
      // 1. Ganti endpoint menjadi '/transaction/history'
      `${import.meta.env.VITE_API_BASE_URL}/transaction/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // 2. Gunakan 'params' untuk mengirim offset & limit sebagai query string
        params: {
          offset: offset,
          limit: limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get Transaction History API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
