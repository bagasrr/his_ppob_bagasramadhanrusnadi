import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { GetBanners, GetServices } from "../api/Details";
import type { BannerItem, ServiceItem } from "../type/details";

interface ProfileDetailsData {
  banners: BannerItem[];
  services: ServiceItem[];
}

export const useGetBannerServices = (token: string) => {
  const [data, setData] = useState<ProfileDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [bannersData, servicesData] = await Promise.all([GetBanners(), GetServices(token)]);

      setData({
        banners: bannersData.data,
        services: servicesData.data,
      });
    } catch (err) {
      const errorMessage = "Gagal memuat data.";
      console.error(errorMessage, err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return { data, loading, error, refetchProfile: fetchDetails };
};
