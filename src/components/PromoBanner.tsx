import React from "react";

interface PromoBannerProps {
  imageUrl: string;
  title: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ imageUrl, title }) => {
  return (
    // --- PERUBAHAN DI SINI ---
    // Tambahkan flex-shrink-0 dan atur lebar tetap
    <div className="w-72 h-32 rounded-lg overflow-hidden shadow-md cursor-pointer flex-shrink-0">
      {/* Tandai di sini: Ganti 'src' dengan URL banner dari API */}
      <img src={imageUrl || "https://via.placeholder.com/288x128"} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
    </div>
  );
};

export default PromoBanner;
