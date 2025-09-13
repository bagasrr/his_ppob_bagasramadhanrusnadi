import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Kolom Kiri: Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
      </div>

      {/* Kolom Kanan: Ilustrasi (hanya tampil di layar besar) */}
      <div className="hidden lg:flex lg:flex-1  items-center justify-center">
        <img src="/Website Assets/Illustrasi Login.png" alt="SIMS PPOB Illustration" className="h-screen w-full" />
      </div>
    </div>
  );
};

export default AuthLayout;
