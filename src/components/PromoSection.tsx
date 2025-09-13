import React from "react";
import PromoBanner from "./PromoBanner";

interface BannerItem {
  banner_name: string;
  banner_image: string;
}

interface PromoSectionProps {
  banners: BannerItem[];
}

const PromoSection: React.FC<PromoSectionProps> = ({ banners }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Temukan promo menarik</h3>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
      <div className="flex overflow-x-auto space-x-4 py-2">
        {banners.map((banner) => (
          <PromoBanner key={banner.banner_name} imageUrl={banner.banner_image} title={banner.banner_name} />
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
