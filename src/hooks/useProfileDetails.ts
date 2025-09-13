import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { GetBalance, GetProfile } from "../api/Details";
import type { Balance, Profile } from "../type/details";

interface ProfileDetailsData {
  profile: Profile;
  balance: Balance;
}

export const useProfileDetails = (token: string) => {
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
      const [profileData, balanceData] = await Promise.all([GetProfile(token), GetBalance(token)]);

      setData({
        profile: profileData.data,
        balance: balanceData.data,
      });
    } catch (err) {
      const errorMessage = "Gagal memuat detail profil.";
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
