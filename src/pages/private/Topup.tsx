import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { topupSchema } from "../../zod/validation";
import { useProfileDetails } from "../../hooks/useProfileDetails";
import PageLayout from "../../layouts/PageLayout";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import { Button } from "../../components/Button";
import { TopUpBalance } from "../../api/Transaction";

type TopupFormInputs = z.infer<typeof topupSchema>;

const quickNominals = [10000, 20000, 50000, 100000, 250000, 500000];

const TopupPage: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  console.log(token);
  // Menggunakan custom hook Anda untuk mendapatkan data profil & saldo
  const { data: profileData, loading, error, refetchProfile } = useProfileDetails(token);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<TopupFormInputs>({
    resolver: zodResolver(topupSchema),
    mode: "onChange",
  });

  const topUpAmount = watch("top_up_amount");

  const onSubmit: SubmitHandler<TopupFormInputs> = (data) => {
    const topupPromise = TopUpBalance(token, data.top_up_amount);
    console.log(data.top_up_amount);

    toast.promise(topupPromise, {
      loading: "Memproses top up...",
      success: (res) => {
        refetchProfile(); // Refresh profile data to get updated balance
        return res.message || "Top Up berhasil!";
      },
      error: (err) => err.response.data.message || "Gagal melakukan top up.",
    });
  };

  const handleQuickSelect = (amount: number) => {
    setValue("top_up_amount", amount, { shouldValidate: true });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error || !profileData) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error || "Data tidak tersedia"}</div>;
  }

  return (
    <PageLayout pageTitle="Top Up">
      <Header profileImageUrl={profileData.profile.profile_image} userName={`${profileData.profile.first_name} ${profileData.profile.last_name}`} balance={profileData.balance.balance} />

      <div className="mt-8">
        <p className="text-gray-600">Silahkan masukkan</p>
        <h1 className="font-bold text-4xl text-gray-800">Nominal Top Up</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Kolom Kiri: Input dan Tombol Top Up */}
        <div className="space-y-6">
          <InputField type="number" placeholder="masukkan nominal top up" registration={register("top_up_amount", { valueAsNumber: true })} error={errors.top_up_amount} />
          <Button type="submit" variant={isValid ? "primary" : "secondary"} disabled={!isValid}>
            Top Up
          </Button>
        </div>

        {/* Kolom Kanan: Tombol Pilihan Cepat */}
        <div className="grid grid-cols-3 gap-3">
          {quickNominals.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleQuickSelect(amount)}
              className={`p-3 border rounded-lg text-center font-medium transition-colors duration-200 
                ${topUpAmount === amount ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
            >
              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount)}
            </button>
          ))}
        </div>
      </form>
    </PageLayout>
  );
};

export default TopupPage;
