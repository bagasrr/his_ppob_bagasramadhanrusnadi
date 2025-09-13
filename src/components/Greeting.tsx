import React from "react";

interface GreetingProps {
  profileImageUrl: string;
  userName: string;
}

const Greeting: React.FC<GreetingProps> = ({ profileImageUrl, userName }) => {
  return (
    <div className="flex flex-col items-start">
      <img src={profileImageUrl || "/Website Assets/Profile Photo.png"} alt="Profile" className="w-16 h-16 rounded-full mb-2 border-2 border-gray-200" />
      <p className="text-lg text-gray-700">Selamat datang,</p>
      <h1 className="text-2xl font-bold text-gray-900">{userName || "Nama Pengguna"}</h1>
    </div>
  );
};

export default Greeting;
