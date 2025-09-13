import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock, User } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registrationSchema } from "../zod/validation";
import { RegisterAccount } from "../api/Account";
import AuthLayout from "../layouts/AuthLayouts";
import InputField from "../components/InputField";

type RegisterFormInputs = z.infer<typeof registrationSchema>;

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const registerPromise = RegisterAccount(data);

    toast.promise(registerPromise, {
      loading: "Memproses registrasi...",
      success: (res) => {
        reset();
        return res.message || "Registrasi berhasil!";
      },
      error: (err) => {
        return err || "Registrasi gagal, coba lagi.";
      },
    });
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="text-center">
          <div className="flex items-center mb-6 justify-center">
            <img src="/Website Assets/Logo.png" alt="Logo" />
            <span className="ml-3 text-2xl font-semibold text-gray-800">SIMS PPOB</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Lengkapi data untuk membuat akun</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <InputField type="email" placeholder="masukkan email anda" registration={register("email")} error={errors.email} icon={<AtSign className="h-5 w-5 text-gray-400" />} autoComplete="email" />
          <InputField type="text" placeholder="masukkan nama depan anda" registration={register("first_name")} error={errors.first_name} icon={<User className="h-5 w-5 text-gray-400" />} autoComplete="given-name" />
          <InputField type="text" placeholder="masukkan nama belakang anda" registration={register("last_name")} error={errors.last_name} icon={<User className="h-5 w-5 text-gray-400" />} autoComplete="family-name" />
          <InputField type="password" placeholder="buat password" registration={register("password")} error={errors.password} icon={<Lock className="h-5 w-5 text-gray-400" />} autoComplete="new-password" />
          <InputField type="password" placeholder="konfirmasi password" registration={register("confirm_password")} error={errors.confirm_password} icon={<Lock className="h-5 w-5 text-gray-400" />} autoComplete="new-password" />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-red-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Memproses..." : "Registrasi"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?
          <Link to="/login" className="font-semibold leading-6 text-red-600 hover:text-red-500">
            Masuk di sini
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
