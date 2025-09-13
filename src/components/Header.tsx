import React from "react";
import Greeting from "./Greeting";
import BalanceCard from "./BalanceCard";

interface HeaderProps {
  profileImageUrl: string;
  userName: string;
  balance: number;
}

const Header: React.FC<HeaderProps> = ({ profileImageUrl, userName, balance }) => {
  return (
    <header className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Greeting profileImageUrl={profileImageUrl} userName={userName} />
        <BalanceCard balance={balance} />
      </div>
    </header>
  );
};

export default Header;
