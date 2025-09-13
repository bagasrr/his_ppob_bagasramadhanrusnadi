import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center container mx-auto px-4 py-8 bg-white mb-5">
      <Link to="/">
        <img src="/Website Assets/Logo.png" alt="Logo" />
      </Link>
      <div className="flex justify-end items-center space-x-6 text-gray-600 font-medium">
        <Link to="/topup" className="hover:text-red-600">
          Top Up
        </Link>
        <Link to="/transaction" className="hover:text-red-600">
          Transaction
        </Link>
        <Link to="/profile" className="hover:text-red-600">
          Akun
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
