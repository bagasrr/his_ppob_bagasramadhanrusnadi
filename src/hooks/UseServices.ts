import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GetServices } from "../api/Details";
import type { ServiceItem } from "../type/details";

export const useServices = (token: string) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await GetServices(token);
        setServices(data);
      } catch (err) {
        const errorMessage = "Gagal memuat daftar layanan.";
        console.error(errorMessage, err);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [token]);

  return { services, loading, error };
};
