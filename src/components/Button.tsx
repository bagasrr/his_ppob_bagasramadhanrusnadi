import React from "react";
import clsx from "clsx"; // Pustaka untuk menggabungkan class dengan rapi

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary", // Varian default adalah 'primary' (merah)
  isLoading = false,
  ...props
}) => {
  // Style dasar yang dimiliki semua tombol
  const baseStyle =
    "w-full flex justify-center rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer disabled:cursor-not-allowed";

  // Objek yang berisi style spesifik untuk setiap varian
  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-400",
    secondary: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-200",
    outline: "bg-transparent text-red-500 border border-red-500 hover:bg-red-50 disabled:opacity-50",
  };

  return (
    <button
      // Gabungkan semua class: base, variant, dan class tambahan dari luar
      className={clsx(baseStyle, variantStyles[variant], className)}
      // Nonaktifkan tombol saat loading juga
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
