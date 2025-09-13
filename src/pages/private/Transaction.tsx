import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useProfileDetails } from "../../hooks/useProfileDetails";
import { useServices } from "../../hooks/UseServices";
import type { ServiceItem } from "../../type/details";
import PageLayout from "../../layouts/PageLayout";
import Header from "../../components/Header";
import { Button } from "../../components/Button";
import { MakeTransaction } from "../../api/Transaction";
import TransactionHistory from "../../components/TransactionHistory";
import { formatCurrency } from "../../utils/Formatting";
import LoadingModalBox from "../../components/LoadingModalBox";

const TransactionPage: React.FC = () => {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const { data: profileData, loading: profileLoading, error: profileError, refetchProfile } = useProfileDetails(token);
  const { services, loading: servicesLoading, error: servicesError } = useServices(token);

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (services.length > 0) {
      const serviceFromParam = services.find((s) => s.service_code.toLowerCase() === serviceCode?.toLowerCase());
      if (serviceFromParam) {
        setSelectedService(serviceFromParam);
      } else if (serviceCode) {
        toast.error(`Layanan ${serviceCode} tidak ditemukan.`);
        setSelectedService(null);
      }
    }
  }, [services, serviceCode]);

  const handleTransaction = () => {
    if (!selectedService) {
      toast.error("Silakan pilih layanan terlebih dahulu.");
      return;
    }

    const transactionPromise = MakeTransaction(token, selectedService.service_code);

    toast.promise(transactionPromise, {
      loading: "Memproses pembayaran...",
      success: (res) => {
        refetchProfile();
        navigate("/");
        return res.message || "Pembayaran berhasil!";
      },
      error: (err) => err.message || "Pembayaran gagal.",
    });
  };

  // Gabungkan status loading dari kedua hook
  const isLoading = profileLoading || servicesLoading;

  if (isLoading) {
    return <LoadingModalBox children="Loading..." />;
  }
  if (profileError || servicesError || !profileData) {
    return <div className="flex justify-center items-center h-screen text-red-500">{profileError || servicesError || "Data tidak tersedia"}</div>;
  }

  return (
    <PageLayout pageTitle="Transaction">
      <Header profileImageUrl={profileData.profile.profile_image} userName={`${profileData.profile.first_name} ${profileData.profile.last_name}`} balance={profileData.balance.balance} />

      <div className="mt-8">
        <p className="text-gray-600">Pembayaran</p>
        <div className="flex items-center space-x-2">
          {selectedService ? <img src={selectedService.service_icon} alt={selectedService.service_name || "Layanan"} className="w-10 h-10" /> : null}

          <h1 className="font-bold text-xl text-gray-800">{selectedService ? selectedService.service_name : "Pilih Layanan"}</h1>
        </div>
      </div>

      {/* 3. Tampilkan dropdown/pilihan jika tidak ada layanan yang dipilih dari URL */}
      {!serviceCode && (
        <div className="mt-6">
          <select onChange={(e) => setSelectedService(services.find((s) => s.service_code === e.target.value) || null)} className="w-full p-3 border border-gray-300 rounded-lg" value={selectedService?.service_code || ""}>
            <option value="" disabled>
              -- Pilih layanan untuk dibayar --
            </option>
            {services.map((service) => (
              <option key={service.service_code} value={service.service_code}>
                {service.service_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedService ? (
        <div className="mt-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-lg text-gray-800 font-medium">Total Tagihan</span>
            <span className="text-2xl text-gray-900 font-bold">{formatCurrency(selectedService.service_tariff)}</span>
          </div>
          {profileData.balance.balance < selectedService.service_tariff ? (
            <Button className="mt-6">
              <Link to="/topup">Saldo tidak mencukupi, lakukan Top Up</Link>
            </Button>
          ) : (
            <Button className="mt-6" onClick={handleTransaction}>
              {profileData.balance.balance < selectedService.service_tariff ? <Link to="/topup">Saldo tidak mencukupi, lakukan Top Up</Link> : "Bayar"}
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-lg text-gray-800 font-medium">Total Tagihan</span>
          </div>
          <Button className="mt-6" onClick={handleTransaction} disabled variant="secondary">
            Pilih layanan terlebih dahulu
          </Button>
        </div>
      )}

      <TransactionHistory />
    </PageLayout>
  );
};

export default TransactionPage;
