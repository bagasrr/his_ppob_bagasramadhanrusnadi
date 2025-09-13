import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { formatCurrency } from "../utils/Formatting";

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg w-full">
      <p className="text-sm font-light">Saldo anda</p>
      <div className="flex items-center mt-2">
        {!isVisible && <h2 className="text-4xl font-bold mr-2  transition-all duration-300">Rp</h2>}
        <h2 className={`text-4xl font-bold transition-all duration-300 `}>{isVisible ? formatCurrency(balance) : " ••••••••••"}</h2>
      </div>
      <div className="flex items-center text-sm mt-4 cursor-pointer" onClick={toggleVisibility}>
        {isVisible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
        <span>{isVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}</span>
      </div>
    </div>
  );
};

export default BalanceCard;
