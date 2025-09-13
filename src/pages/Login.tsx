import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "../zod/validation";
import { Link, useNavigate } from "react-router-dom";
import { LoginAccount } from "../api/Account";
import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayouts";
import InputField from "../components/InputField";

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Hook untuk navigasi setelah login

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const loginPromise = LoginAccount(data);
    toast.promise(loginPromise, {
      loading: "Mencoba masuk...",
      success: (res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
        return res?.message || "Login berhasil!";
      },
      error: (err) => {
        console.log(err);
        return err || "Email atau password salah.";
      },
    });
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center mb-6 justify-center">
            <img src="/Website Assets/Logo.png" alt="Logo " />
            <span className="ml-3 text-2xl font-semibold text-gray-800">SIMS PPOB</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Masuk atau buat akun untuk memulai</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <InputField type="email" placeholder="masukkan email anda" registration={register("email")} error={errors.email} icon={<AtSign className="h-5 w-5 text-gray-400" />} autoComplete="email" />

          <InputField type="password" placeholder="masukkan password anda" registration={register("password")} error={errors.password} icon={<Lock className="h-5 w-5 text-gray-400" />} autoComplete="current-password" />

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-red-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Loading..." : "Masuk"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?
          <Link to="/register" className="font-semibold leading-6 text-red-600 hover:text-red-500">
            Registrasi di sini
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
