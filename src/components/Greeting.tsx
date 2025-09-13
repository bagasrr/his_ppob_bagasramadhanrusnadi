import React from "react";

interface GreetingProps {
  profileImageUrl: string;
  userName: string;
}

const Greeting: React.FC<GreetingProps> = ({ profileImageUrl, userName }) => {
  return (
    <div className="flex flex-col items-start">
      {profileImageUrl === "https://minio.nutech-integrasi.com/take-home-test/null" ? (
        <img src="/Website Assets/Profile Photo.png" alt="Default Profile" className="w-16 h-16 rounded-full mb-2 border-2 border-gray-200" />
      ) : (
        <img src={profileImageUrl} alt="Profile" className="w-16 h-16 rounded-full mb-2 border-2 border-gray-200" />
      )}
      <p className="text-lg text-gray-700">Selamat datang,</p>
      <h1 className="text-2xl font-bold text-gray-900">{userName || "Nama Pengguna"}</h1>
    </div>
  );
};

export default Greeting;
