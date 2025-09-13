import Header from "../../components/Header";
import ServicesGrid from "../../components/Services";
import PromoSection from "../../components/PromoSection";
import PageLayout from "../../layouts/PageLayout";
import { useProfileDetails } from "../../hooks/useProfileDetails";
import { useGetBannerServices } from "../../hooks/useGetBannerServices";

const HomePage: React.FC = () => {
  const token = localStorage.getItem("token");
  const { data, loading, error } = useProfileDetails(token || "");
  console.log("data : ", data);
  const { data: servicesBannersData, loading: servicesBannersLoading, error: servicesBannersError } = useGetBannerServices(token || "");

  if (loading || servicesBannersLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error || servicesBannersError || !servicesBannersData || !data) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error || "Data tidak tersedia"}</div>;
  }

  return (
    <PageLayout pageTitle={null}>
      <Header profileImageUrl={data.profile.profile_image} userName={`${data.profile.first_name} ${data.profile.last_name}`} balance={data.balance.balance} />
      <ServicesGrid services={servicesBannersData.services} />
      <PromoSection banners={servicesBannersData.banners} />
    </PageLayout>
  );
};

export default HomePage;
