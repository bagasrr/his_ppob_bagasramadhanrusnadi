import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/private/Home";
import TopupPage from "./pages/private/Topup";
import TransactionPage from "./pages/private/Transaction";
import ProfilePage from "./pages/private/Profile";
import { Toaster } from "react-hot-toast";

const useAuth = () => {
  const isAuthenticated = true;
  return isAuthenticated;
};

const PrivateRoute: React.FC = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rute Privat */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/topup" element={<TopupPage />} />
        {/* <Route path="/transaction" element={<TransactionPage />} /> */}
        <Route path="/transaction/:serviceCode?" element={<TransactionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Rute Not Found */}
      <Route path="*" element={<div>404 - Halaman Tidak Ditemukan</div>} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-left" reverseOrder={false} />
      <AppRoutes />
    </div>
  );
}

export default App;
